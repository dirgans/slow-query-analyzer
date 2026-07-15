import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { DatabaseModule } from './database/database.module';
import { AnalyzerModule } from './analyzer/analyzer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ScheduleModule.forRoot(),

    EventEmitterModule.forRoot(),

    DatabaseModule,

    AnalyzerModule,

    UsersModule,
  ],
})
export class AppModule {}
