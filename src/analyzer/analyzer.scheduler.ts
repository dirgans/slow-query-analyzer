import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AnalyzerService } from './analyzer.service';

@Injectable()
export class AnalyzerScheduler {
  private readonly logger = new Logger(AnalyzerScheduler.name);

  constructor(
    private readonly analyzerService: AnalyzerService,
  ) {}

  @Cron(CronExpression.EVERY_MONDAY_AT_MIDNIGHT)
  async generateWeeklyReport(): Promise<void> {
    const report = await this.analyzerService.getWeeklyReport();

    this.logger.log('==============================');
    this.logger.log('Weekly Slow Query Report');
    this.logger.log('==============================');

    console.table(report);
  }
}
