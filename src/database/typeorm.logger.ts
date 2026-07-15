import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';

export class SlowQueryLogger implements TypeOrmLogger {
  private readonly logger = new Logger(SlowQueryLogger.name);

  /**
   * EventEmitter will be injected later
   */
  static eventEmitter: EventEmitter2;

  logQuery(): void {}

  logQueryError(
    error: string,
    query: string,
    parameters?: unknown[],
    queryRunner?: QueryRunner,
  ): void {
    this.logger.error(error);

    this.logger.error(query);

    if (parameters?.length) {
      this.logger.error(JSON.stringify(parameters));
    }
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[],
    queryRunner?: QueryRunner,
  ): void {
    this.logger.warn(`Slow Query (${time} ms)`);

    this.logger.warn(query);

    SlowQueryLogger.eventEmitter?.emit('slow-query.detected', {
      query,
      parameters,
      executionTime: time,
      createdAt: new Date(),
    });
  }

  logSchemaBuild(message: string): void {
    this.logger.log(message);
  }

  logMigration(message: string): void {
    this.logger.log(message);
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: unknown,
    queryRunner?: QueryRunner,
  ): void {
    switch (level) {
      case 'log':
        this.logger.log(message);
        break;

      case 'info':
        this.logger.verbose(message);
        break;

      case 'warn':
        this.logger.warn(message);
        break;
    }
  }
}
