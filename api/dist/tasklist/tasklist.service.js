"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasklistService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
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
let TasklistService = class TasklistService {
    constructor(http) {
        this.http = http;
    }
    async getTasks(variables) {
        const { http } = this;
        const { errors, data } = (await rxjs_1.firstValueFrom(http.post('/', {
            query: getTasksQuery,
            variables,
        }))).data;
        if (errors) {
        }
        return data.tasks;
    }
    async getTask(id) {
        const { http } = this;
        const { errors, data } = (await rxjs_1.firstValueFrom(http.post('/', {
            query: getTaskQuery,
            variables: {
                id,
            },
        }))).data;
        if (errors) {
        }
        return data.task;
    }
    async completeTask(id, variables) {
        const { http } = this;
        const { errors, data } = (await rxjs_1.firstValueFrom(http.post('/', {
            query: completeTaskMutation,
            variables: {
                variables: [
                    ...variables.map((variable) => (Object.assign(Object.assign({}, variable), { value: JSON.stringify(variable.value) }))),
                ],
                id,
            },
        }))).data;
        if (errors) {
        }
        return data.completeTask;
    }
};
TasklistService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TasklistService);
exports.TasklistService = TasklistService;
//# sourceMappingURL=tasklist.service.js.map