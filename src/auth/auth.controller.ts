import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(@Body() loginRequest: loginAuthDto) {

        const checkUser
    }
}
