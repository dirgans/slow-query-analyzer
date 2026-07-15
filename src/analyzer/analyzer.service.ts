import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Analyzer } from './analyzer.entity';
import { SlowQueryDetectedEvent } from '../common/events';

@Injectable()
export class AnalyzerService {
  constructor(
    @InjectRepository(Analyzer)
    private readonly repository: Repository<Analyzer>,
  ) {}

  async save(event: SlowQueryDetectedEvent): Promise<void> {
    await this.repository.save({
      query: event.query,
      parameters: event.parameters,
      executionTime: event.executionTime,
    });
  }

  async getWeeklyReport() {
    return this.repository
      .createQueryBuilder('log')
      .select('log.query', 'query')
      .addSelect('COUNT(*)', 'count')
      .addSelect('ROUND(AVG(log.execution_time),2)', 'avgTime')
      .addSelect('MAX(log.execution_time)', 'maxTime')
      .groupBy('log.query')
      .orderBy('count', 'DESC')
      .getRawMany();
  }

  async getDashboard() {
    const total = await this.repository.count();

    const topQueries = await this.repository
      .createQueryBuilder('log')
      .select('log.query', 'query')
      .addSelect('COUNT(*)', 'count')
      .addSelect('ROUND(AVG(log.execution_time),2)', 'avgTime')
      .groupBy('log.query')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    return {
      threshold: 300,
      totalSlowQueries: total,
      topQueries,
    };
  }
}
