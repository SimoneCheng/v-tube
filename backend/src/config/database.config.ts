import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'v_tube',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // 注意：在生產環境中應設置為 false
};
