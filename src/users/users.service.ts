import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(UserEntity)
      private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: number): Promise<UserEntity> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.repository.create(dto);
    return this.repository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.repository.update(id, updateUserDto);
    return this.findById(id);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
