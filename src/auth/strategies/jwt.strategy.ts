import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'sua_chave_secreta_aqui',
    });
  }

  async validate(payload: any) {
    try {
      // Buscar usuário pelo ID do token
      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      // Retornar dados do usuário (sem senha)
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido!', error);
    }
  }
}

