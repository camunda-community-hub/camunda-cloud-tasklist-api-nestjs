import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LoanRequestsModule } from './loan-requests/loan-requests.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    LoanRequestsModule,
  ],
})
export class AppModule {}
