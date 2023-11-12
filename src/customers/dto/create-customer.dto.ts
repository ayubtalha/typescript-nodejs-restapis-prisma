import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty()
  password: string;

  // @ApiProperty({ required: false, default: false })
  // id?: string = false;
}
