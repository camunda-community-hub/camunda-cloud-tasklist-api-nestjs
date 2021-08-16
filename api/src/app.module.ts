import { Module } from '@nestjs/common';
import { TasklistService } from './tasklist/tasklist.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TasklistService],
})
export class AppModule {}
