import { LoanRequestsService } from 'src/loan-requests/loan-requests.service';
import { LoanRequestsFiltersArgs } from './dto/loan-requests-filters.args';
export declare class LoanRequestsResolver {
    private readonly loanRequests;
    constructor(loanRequests: LoanRequestsService);
    approve(id: string, creditScore: number): Promise<import("./dto/loan-request.dto").LoanRequestDto>;
    decline(id: string, creditScore: number): Promise<import("./dto/loan-request.dto").LoanRequestDto>;
    requests(args: LoanRequestsFiltersArgs): Promise<import("./dto/loan-request.dto").LoanRequestDto[]>;
    request(id: string): Promise<import("./dto/loan-request.dto").LoanRequestDto>;
}
