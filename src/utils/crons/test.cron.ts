import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TestCron {
  private readonly logger = new Logger(TestCron.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}
