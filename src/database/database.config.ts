import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SlowQueryLogger } from './typeorm.logger';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',

  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),

  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'postgres'),

  database: configService.get<string>('DB_DATABASE', 'analyzer'),

  autoLoadEntities: true,

  synchronize: true,

  logger: new SlowQueryLogger(),

  logging: ['error', 'warn'],

  maxQueryExecutionTime: Number(
    configService.get('SLOW_QUERY_THRESHOLD', 300),
  ),
});
