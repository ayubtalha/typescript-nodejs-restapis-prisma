import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  readonly role: CustomerRole;
}

enum CustomerRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
