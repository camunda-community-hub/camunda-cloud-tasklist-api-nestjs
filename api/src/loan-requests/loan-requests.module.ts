import { Module } from '@nestjs/common';
import { LoanRequestsService } from './loan-requests.service';
import { TasklistModule } from 'src/tasklist/tasklist.module';
import { LoanRequestsResolver } from './loan-requests.resolver';

@Module({
  imports: [TasklistModule],
  providers: [LoanRequestsResolver, LoanRequestsService],
  exports: [LoanRequestsService, TasklistModule],
})
export class LoanRequestsModule {}
