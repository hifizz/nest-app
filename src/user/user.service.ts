import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {validate} from 'class-validator'
import {Repository, getRepository} from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export type IUser = any;

@Injectable()
export class UserService {
  private readonly users: IUser[];

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public async findOne(username: string): Promise<IUser | undefined> {
    return this.users.find(user => user.username === username);
  }

  public async create(userDto: CreateUserDto) {
    // check 参数
    const {username, password} = userDto;

    const qb = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username });

    // check 是否已经存在
    const user = await qb.getOne();
    if (user) {
      const errors = { username: 'username must be qunique'};
      throw new HttpException({message: '用户名已存在', errors}, HttpStatus.BAD_REQUEST);
    }

    // create
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;

    const errors = await validate(newUser);

    if(errors.length > 0) {
      const tempErrors = {username: 'Userinput is not valid.'};
      throw new HttpException({message: 'Input data validation failed', tempErrors}, HttpStatus.BAD_REQUEST);
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    }
    // save
  }

  public async update(userDto: CreateUserDto) {}

  public async delete(userDto: CreateUserDto) {}

  public async findById(id: User['id']) {
    console.log('findById')
    try {
      const result = await this.userRepository.findOne(id)
      console.log(result)
      return result ;
    } catch (err) {
      throw err;
    }
  }

  public async findAll() {
    return await this.userRepository.findOne();
  }

  public async getProfile(id: number) {
    return await this.userRepository.findOne(id);
  }
}
