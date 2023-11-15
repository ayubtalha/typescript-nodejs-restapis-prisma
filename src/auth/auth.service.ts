import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity, RefreshTokenAuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async accessToken(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.customer.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign(
        { userId: user.id },
        { expiresIn: '15m' },
      ),
    };
  }

  async refreshToken(
    email: string,
    password: string,
    accessToken: string,
  ): Promise<RefreshTokenAuthEntity> {
    const user = await this.prisma.customer.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const checkAccessToken = this.jwtService.verify(accessToken);

    if (!checkAccessToken)
      throw new UnauthorizedException('Invalid accessToken');

    return {
      refreshToken: this.jwtService.sign(
        { userId: user.id },
        { expiresIn: '10h' },
      ),
    };
  }
}
