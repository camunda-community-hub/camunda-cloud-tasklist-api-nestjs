import { Injectable } from '@nestjs/common';
import { TasklistService } from 'src/tasklist/tasklist.service';
import { LoanRequestDto } from './dto/loan-request.dto';
import { requestParamToTaskParam } from './helpers/requestParamToTaskParam';
import { taskToRequest } from './helpers/taskToRequest';

@Injectable()
export class LoanRequestsService {
  constructor(private readonly tasklist: TasklistService) {}

  async getRequests(params): Promise<LoanRequestDto[]> {
    const tasks = await this.tasklist.getTasks(
      /*
        It is important we hardcode the taskDefinitionId here, otherwise the API might return task from other processes.
        The value `loanReview` is the User Task id in the BPMN definition.
      */
      requestParamToTaskParam({ ...params, taskDefinitionId: 'loanReview' }),
    );

    return tasks.map(taskToRequest);
  }

  async getRequest(id: LoanRequestDto['id']): Promise<LoanRequestDto> {
    return taskToRequest(await this.tasklist.getTask(id));
  }

  async setRequestDecision(
    id: LoanRequestDto['id'],
    approved: LoanRequestDto['approved'],
    creditScore: LoanRequestDto['creditScore'],
  ): Promise<LoanRequestDto> {
    const task = await this.tasklist.completeTask(id, [
      { name: 'approved', value: approved.toString() },
      { name: 'decisionDate', value: new Date().toISOString() },
      { name: 'creditScore', value: creditScore.toString() },
    ]);

    return taskToRequest(task);
  }
}
