import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { loginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

     constructor(private readonly userService: UserService) { }
    

    async checkUser(loginAuthDto: loginAuthDto) {
        const user = await this.userService.findOneByEmail(loginAuthDto.email);
        if (!user) {
            return false
        }
        const Mathpwd = await 
    }
}
