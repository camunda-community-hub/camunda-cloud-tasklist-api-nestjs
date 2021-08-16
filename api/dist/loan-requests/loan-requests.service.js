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
exports.LoanRequestsService = void 0;
const common_1 = require("@nestjs/common");
const tasklist_service_1 = require("../tasklist/tasklist.service");
const requestParamToTaskParam_1 = require("./helpers/requestParamToTaskParam");
const taskToRequest_1 = require("./helpers/taskToRequest");
let LoanRequestsService = class LoanRequestsService {
    constructor(tasklist) {
        this.tasklist = tasklist;
    }
    async getRequests(params) {
        const tasks = await this.tasklist.getTasks(requestParamToTaskParam_1.requestParamToTaskParam(Object.assign(Object.assign({}, params), { taskDefinitionId: 'loanReview' })));
        return tasks.map(taskToRequest_1.taskToRequest);
    }
    async getRequest(id) {
        return taskToRequest_1.taskToRequest(await this.tasklist.getTask(id));
    }
    async setRequestDecision(id, approved, creditScore) {
        const task = await this.tasklist.completeTask(id, [
            { name: 'approved', value: approved.toString() },
            { name: 'decisionDate', value: new Date().toISOString() },
            { name: 'creditScore', value: creditScore.toString() },
        ]);
        return taskToRequest_1.taskToRequest(task);
    }
};
LoanRequestsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [tasklist_service_1.TasklistService])
], LoanRequestsService);
exports.LoanRequestsService = LoanRequestsService;
//# sourceMappingURL=loan-requests.service.js.map