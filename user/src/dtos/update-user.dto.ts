import { IsEmail, IsIn, IsOptional, IsString, MaxLength } from 'class-validator'
import { UserRole } from 'src/entities/user.entity'

export class UpdateUserDto {
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name: string

  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsOptional()
  email: string

  @MaxLength(100)
  @IsString()
  @IsOptional()
  password: string

  @IsIn([UserRole.CLIENT, UserRole.PROVIDER], {
    message: 'role must be a valid value: CLIENT OR PROVIDER.',
  })
  @IsOptional()
  role: UserRole
}
