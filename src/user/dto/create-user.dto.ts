import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: "Le username doit au moins avoir 2 caractères"})
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(4, {message: "Il faut 4 caractères minimum"})
    password: string;

}
