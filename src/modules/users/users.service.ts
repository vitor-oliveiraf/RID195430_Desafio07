import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserResponseDto } from './dto/create-user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  // Criar novo usuário
  async create(createUserDto: CreateUserDto) {
    try {
      // Verificar se username já existe
      if (await this.userRepository.usernameExists(createUserDto.username)) {
        throw new ConflictException('Username já existe');
      }

      // Verificar se email já existe
      if (await this.userRepository.emailExists(createUserDto.email)) {
        throw new ConflictException('Email já existe');
      }

      // Criptografar a senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );

      // Criar usuário com senha criptografada
      const userData = {
        ...createUserDto,
        password: hashedPassword,
      };

      const user = await this.userRepository.create(userData);

      // Retornar usuário sem a senha
      return this.sanitizeUser(user as CreateUserResponseDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Erro ao criar usuário');
    }
  }

  // Buscar todos os usuários
  async findAll() {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.sanitizeUser(user));
  }

  // Buscar usuário por ID
  async findOne(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.sanitizeUser(user);
  }

  // Buscar usuário por username
  async findByUsername(username: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.sanitizeUser(user);
  }

  // Buscar usuário por email
  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.sanitizeUser(user);
  }

  // Atualizar usuário
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      // Verificar se usuário existe
      const existingUser = await this.userRepository.findById(id);
      if (!existingUser) {
        throw new NotFoundException('Usuário não encontrado');
      }

      // Se estiver atualizando username, verificar se já existe
      if (
        updateUserDto.username &&
        updateUserDto.username !== existingUser.username
      ) {
        if (await this.userRepository.usernameExists(updateUserDto.username)) {
          throw new ConflictException('Username já existe');
        }
      }

      // Se estiver atualizando email, verificar se já existe
      if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
        if (await this.userRepository.emailExists(updateUserDto.email)) {
          throw new ConflictException('Email já existe');
        }
      }

      // Se estiver atualizando senha, criptografar
      if (updateUserDto.password) {
        const saltRounds = 10;
        updateUserDto.password = await bcrypt.hash(
          updateUserDto.password,
          saltRounds,
        );
      }

      const updatedUser = await this.userRepository.update(id, updateUserDto);
      if (!updatedUser) {
        throw new NotFoundException('Erro ao atualizar usuário');
      }

      return this.sanitizeUser(updatedUser);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new BadRequestException('Erro ao atualizar usuário');
    }
  }

  // Deletar usuário
  async remove(id: number) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new BadRequestException('Erro ao deletar usuário');
    }

    return { message: 'Usuário deletado com sucesso' };
  }

  // Verificar credenciais (para login)
  async validateCredentials(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return this.sanitizeUser(user);
  }

  // Remover dados sensíveis do usuário
  private sanitizeUser(user: CreateUserResponseDto) {
    const newUser = new CreateUserResponseDto();
    newUser.id = user.id;
    newUser.name = user.name;
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.createdAt = user.createdAt;
    newUser.updatedAt = user.updatedAt;
    return newUser;
  }
}
