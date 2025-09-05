import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      // Validar credenciais
      const user = await this.usersService.validateCredentials(
        loginDto.username,
        loginDto.password,
      );

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // Gerar token JWT
      const payload = {
        username: user.username,
        sub: user.id,
        email: user.email,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        access_token: accessToken,
        token_type: 'Bearer',
        expires_in: 3600, // 1 hora
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Erro no processo de login');
    }
  }

  async validateToken(token: string): Promise<Record<string, unknown>> {
    try {
      const payload = await this.jwtService.verify(token);
      return payload as Record<string, unknown>;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
