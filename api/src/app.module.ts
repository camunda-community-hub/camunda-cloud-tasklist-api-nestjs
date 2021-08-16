import { Module } from '@nestjs/common';
import { TasklistModule } from './tasklist/tasklist.module';

@Module({
  imports: [TasklistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
