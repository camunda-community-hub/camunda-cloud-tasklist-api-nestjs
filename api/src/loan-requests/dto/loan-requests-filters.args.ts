import { Int, Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LoanRequestsFiltersArgs {
  @Field(() => Int, { nullable: true })
  pageSize?: number;
  @Field(() => [String], { nullable: true })
  searchAfter?: [string, string];
  @Field(() => [String], { nullable: true })
  searchBefore?: [string, string];
  @Field(() => String, { nullable: true })
  status?: 'open' | 'resolved';
}
