import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokenBlacklistService } from './token-blacklist.service';
import * as bcrypt from 'bcrypt';
import { Register } from './register.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: Register) {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('this email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    const { ...result } = newUser;
    return result;
  }

  async logout(token: string) {
    try {
      const decodedToken = this.jwtService.decode(token) as { exp: number };
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expirationTime = decodedToken.exp - currentTimestamp;

      if (expirationTime > 0) {
        await this.tokenBlacklistService.addToBlacklist(token, expirationTime);
        this.logger.log(`Token blacklisted successfully: ${token}`);
      } else {
        this.logger.warn(`Token already expired, not blacklisting: ${token}`);
      }
    } catch (error) {
      this.logger.error(`Error during logout: ${error.message}`, error.stack);
      throw error;
    }
  }
}
