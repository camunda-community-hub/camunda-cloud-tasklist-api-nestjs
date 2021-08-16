"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanRequestsModule = void 0;
const common_1 = require("@nestjs/common");
const loan_requests_service_1 = require("./loan-requests.service");
const tasklist_module_1 = require("../tasklist/tasklist.module");
const loan_requests_resolver_1 = require("./loan-requests.resolver");
let LoanRequestsModule = class LoanRequestsModule {
};
LoanRequestsModule = __decorate([
    common_1.Module({
        imports: [tasklist_module_1.TasklistModule],
        providers: [loan_requests_resolver_1.LoanRequestsResolver, loan_requests_service_1.LoanRequestsService],
        exports: [loan_requests_service_1.LoanRequestsService, tasklist_module_1.TasklistModule],
    })
], LoanRequestsModule);
exports.LoanRequestsModule = LoanRequestsModule;
//# sourceMappingURL=loan-requests.module.js.map