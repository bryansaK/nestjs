import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user : User = new User();
    const saltOrRounds = 10;
    const pwd = createUserDto.password;
    const hash = await bcrypt.hash(pwd, saltOrRounds);
    user.email = createUserDto.email;
    user.password = hash;
    user.username = createUserDto.username;
    this.userRepository.save(user)
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {

    return `This action returns a #${id} user`;
  }

  async findOneByEmail(emailRequested: string) {
    const user = await this.userRepository.findOneBy({email: emailRequested})
    console.log(user)
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
