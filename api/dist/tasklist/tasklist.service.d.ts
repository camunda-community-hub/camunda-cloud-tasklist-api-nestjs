import { HttpService } from '@nestjs/axios';
import { TaskDto } from './dto/task.dto';
declare type QueryVariables = {
    pageSize?: number;
    searchAfter?: [string, string];
    searchBefore?: [string, string];
    state?: 'CREATED' | 'COMPLETED';
    taskDefinitionId?: string;
};
export declare class TasklistService {
    private readonly http;
    constructor(http: HttpService);
    getTasks(variables: QueryVariables): Promise<TaskDto[]>;
    getTask(id: TaskDto['id']): Promise<TaskDto>;
    completeTask(id: TaskDto['id'], variables?: TaskDto['variables']): Promise<any>;
}
export {};
