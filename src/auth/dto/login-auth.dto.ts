import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class loginAuthDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(4, {message: "Il faut 4 caractères minimum"})
    password: string;

}
