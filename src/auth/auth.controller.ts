import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('/signin')
    async signin(@Body() loginRequest: loginAuthDto) {

        const matchingUser = await this.authService.checkUserLogin(loginRequest);
        if (!matchingUser) {
            throw new HttpException('Email ou mdp pas bon', HttpStatus.BAD_REQUEST)
        }
        const token = this.authService.getLoginToken(matchingUser)
        return (token)
    }

    @Post('/signup')
    async signup(@Body() userCreationRequest: CreateUserDto) {
        const checkMail = await this.userService.findOneByEmail(userCreationRequest.email)
        if (checkMail) {
            throw new HttpException('Email deja pris', HttpStatus.BAD_REQUEST);
        }
        return this.userService.create(userCreationRequest);
    }
}
