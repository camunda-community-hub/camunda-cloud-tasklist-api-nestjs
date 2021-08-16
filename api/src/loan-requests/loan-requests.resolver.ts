import { Resolver, Query, Mutation, Args, ID, Float } from '@nestjs/graphql';
import { LoanRequestsService } from 'src/loan-requests/loan-requests.service';
import { APPROVED } from './constants';
import { LoanRequestsFiltersArgs } from './dto/loan-requests-filters.args';
import { LoanRequest } from './entities/loan-request.entity';

@Resolver(() => LoanRequest)
export class LoanRequestsResolver {
  constructor(private readonly loanRequests: LoanRequestsService) {}

  @Mutation(() => LoanRequest)
  approve(
    @Args('id', { type: () => ID }) id: string,
    @Args('creditScore', { type: () => Float })
    creditScore: number,
  ) {
    return this.loanRequests.setRequestDecision(id, APPROVED.yes, creditScore);
  }

  @Mutation(() => LoanRequest)
  decline(
    @Args('id', { type: () => ID }) id: string,
    @Args('creditScore', { type: () => Float })
    creditScore: number,
  ) {
    return this.loanRequests.setRequestDecision(id, APPROVED.no, creditScore);
  }

  @Query(() => [LoanRequest], { name: 'loanRequests' })
  requests(@Args() args: LoanRequestsFiltersArgs) {
    return this.loanRequests.getRequests(args);
  }

  @Query(() => LoanRequest, { name: 'loanRequest' })
  request(@Args('id', { type: () => ID }) id: string) {
    return this.loanRequests.getRequest(id);
  }
}
