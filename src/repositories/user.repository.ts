import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Criar novo usuário
  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  // Buscar usuário por ID
  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Buscar usuário por username
  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  // Buscar usuário por email
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Buscar todos os usuários
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Atualizar usuário
  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return await this.findById(id);
  }

  // Deletar usuário
  async delete(id: number): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }

  // Verificar se username existe
  async usernameExists(username: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { username } });
    return count > 0;
  }

  // Verificar se email existe
  async emailExists(email: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { email } });
    return count > 0;
  }
}
