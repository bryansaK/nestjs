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
    await this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(idUser: number) {
    return this.userRepository.findOneBy({id: idUser});
  }

  async findOneByEmail(emailRequested: string) {
    const user = await this.userRepository.findOneBy({email: emailRequested})
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
