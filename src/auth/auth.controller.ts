import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity, RefreshTokenAuthEntity } from './entity/auth.entity';
import { LoginDto, RefreshTokenDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login/accessToken')
  @ApiOkResponse({ type: AuthEntity })
  accessToken(@Body() { email, password }: LoginDto) {
    return this.authService.accessToken(email, password);
  }

  @Post('refreshToken')
  @ApiOkResponse({ type: RefreshTokenAuthEntity })
  refreshToken(@Body() { email, password, accessToken }: RefreshTokenDto) {
    return this.authService.refreshToken(email, password, accessToken);
  }
}
