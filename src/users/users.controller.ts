import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../decorators/user-id.decorator';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMe(@UserId() id: number): Promise<UserEntity> {
    return this.usersService.findById(id);
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.usersService.update(id, updateUserDto);
    return this.usersService.findById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<UserEntity> {
    const deletedUser = await this.usersService.findById(id);
    await this.usersService.deleteById(id);
    return deletedUser;
  }
}
