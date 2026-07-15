import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Analyzer } from './analyzer.entity';
import { AnalyzerService } from './analyzer.service';
import { AnalyzerListener } from './analyzer.listener';
import { AnalyzerScheduler } from './analyzer.scheduler';
import { SlowQueryLogger } from '../database/typeorm.logger';

@Module({
  imports: [TypeOrmModule.forFeature([Analyzer])],
  providers: [
    AnalyzerService,
    AnalyzerListener,
    AnalyzerScheduler,
    {
      provide: 'LOGGER_BINDER',
      inject: [EventEmitter2],
      useFactory: (eventEmitter: EventEmitter2) => {
        SlowQueryLogger.eventEmitter = eventEmitter;
        return true;
      },
    },
  ],
  exports: [AnalyzerService],
})
export class AnalyzerModule {}
