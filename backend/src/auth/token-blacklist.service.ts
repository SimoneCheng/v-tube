import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TokenBlacklistService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async addToBlacklist(token: string, expirationTime: number): Promise<void> {
    await this.cacheManager.set(`blacklist:${token}`, 'true', {
      ttl: expirationTime,
    } as any);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const result = await this.cacheManager.get(`blacklist:${token}`);
    return result === 'true';
  }
}
