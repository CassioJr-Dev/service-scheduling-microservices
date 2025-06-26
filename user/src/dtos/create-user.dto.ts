import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { UserRole } from 'src/entities/user.entity'

export class CreateUserDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsIn([UserRole.CLIENT, UserRole.PROVIDER], {
    message: 'role must be a valid value: CLIENT OR PROVIDER.',
  })
  @IsNotEmpty()
  role: UserRole
}
