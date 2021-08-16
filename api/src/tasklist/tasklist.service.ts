import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TaskDto } from './dto/task.dto';

const getTasksQuery = `
  query GetTasks($state: TaskState $pageSize: Int $searchAfter: [String!] $searchBefore: [String!] $taskDefinitionId: String!) {
    tasks(query: { state: $state pageSize: $pageSize searchAfter: $searchAfter searchBefore: $searchBefore taskDefinitionId: $taskDefinitionId }) {
      id
      creationTime
      variables {
        value
        name
      }
      taskState
      isFirst
      sortValues
    }
  }
`;
const getTaskQuery = `
  query GetTask($id: String!) {
    task(id: $id) {
      id
      creationTime
      variables {
        value
        name
      }
      sortValues
    }
  }
`;
const completeTaskMutation = `
  mutation CompleteTask($id: String!, $variables: [VariableInput!]!) {
    completeTask(taskId: $id, variables: $variables) {
      id
      completionTime
      variables {
        name
        value
      }
      sortValues
    }
  }
`;

type QueryVariables = {
  pageSize?: number;
  searchAfter?: [string, string];
  searchBefore?: [string, string];
  state?: 'CREATED' | 'COMPLETED';
  taskDefinitionId?: string;
};

@Injectable()
export class TasklistService {
  constructor(private readonly http: HttpService) {}

  async getTasks(variables: QueryVariables): Promise<TaskDto[]> {
    const { http } = this;
    const { errors, data } = (
      await firstValueFrom(
        http.post('/', {
          query: getTasksQuery,
          variables,
        }),
      )
    ).data;

    if (errors) {
      // handle error
    }

    return data.tasks;
  }

  async getTask(id: TaskDto['id']): Promise<TaskDto> {
    const { http } = this;
    const { errors, data } = (
      await firstValueFrom(
        http.post('/', {
          query: getTaskQuery,
          variables: {
            id,
          },
        }),
      )
    ).data;

    if (errors) {
      // handle error
    }

    return data.task;
  }

  async completeTask(id: TaskDto['id'], variables?: TaskDto['variables']) {
    const { http } = this;

    const { errors, data } = (
      await firstValueFrom(
        http.post('/', {
          query: completeTaskMutation,
          variables: {
            variables: [
              ...variables.map((variable) => ({
                ...variable,
                value: JSON.stringify(variable.value),
              })),
            ],
            id,
          },
        }),
      )
    ).data;

    if (errors) {
      // handle error
    }

    return data.completeTask;
  }
}
