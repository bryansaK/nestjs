import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { loginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }


    async checkUserLogin(loginAuthDto: loginAuthDto) {
        const user = await this.userService.findOneByEmail(loginAuthDto.email);
        if (!user) {
            return null
        }
        const matchPwd = await bcrypt.compare(loginAuthDto.password, user.password)
        if (!matchPwd) {
            return null
        }
        return user
    }

    async getLoginToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    }
}
