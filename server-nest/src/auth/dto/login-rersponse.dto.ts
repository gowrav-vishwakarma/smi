import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty()
  user: {
    _id: string;
    name: string;
    email: string;
  };

  @ApiProperty()
  accessToken: string;
}
