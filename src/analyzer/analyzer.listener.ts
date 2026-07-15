import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  Events,
  SlowQueryDetectedEvent,
} from '../common/events';
import { AnalyzerService } from './analyzer.service';

@Injectable()
export class AnalyzerListener {
  constructor(
    private readonly analyzerService: AnalyzerService,
  ) {}

  @OnEvent(Events.SLOW_QUERY_DETECTED)
  async handleSlowQuery(
    event: SlowQueryDetectedEvent,
  ): Promise<void> {
    await this.analyzerService.save(event);
  }
}
