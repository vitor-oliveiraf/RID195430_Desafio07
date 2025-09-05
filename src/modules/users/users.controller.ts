import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: '👤 Usuário criado com sucesso!',
      user: user,
    };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      message: '📋 Usuários encontrados',
      count: users.length,
      users: users,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    return {
      message: '👤 Usuário encontrado',
      user: user,
    };
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    return {
      message: '👤 Usuário encontrado',
      user: user,
    };
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    return {
      message: '👤 Usuário encontrado',
      user: user,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(parseInt(id), updateUserDto);
    return {
      message: '✅ Usuário atualizado com sucesso!',
      user: user,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(parseInt(id));
    return {
      message: '🗑️ Usuário deletado com sucesso!',
    };
  }

  @Public()
  @Post('validate')
  async validateCredentials(
    @Body() credentials: { username: string; password: string },
  ) {
    const user = await this.usersService.validateCredentials(
      credentials.username,
      credentials.password,
    );

    if (user) {
      return {
        message: '✅ Credenciais válidas',
        user: user,
      };
    } else {
      return {
        message: '❌ Credenciais inválidas',
        user: null,
      };
    }
  }
}
