import { TasklistService } from 'src/tasklist/tasklist.service';
import { LoanRequestDto } from './dto/loan-request.dto';
export declare class LoanRequestsService {
    private readonly tasklist;
    constructor(tasklist: TasklistService);
    getRequests(params: any): Promise<LoanRequestDto[]>;
    getRequest(id: LoanRequestDto['id']): Promise<LoanRequestDto>;
    setRequestDecision(id: LoanRequestDto['id'], approved: LoanRequestDto['approved'], creditScore: LoanRequestDto['creditScore']): Promise<LoanRequestDto>;
}
