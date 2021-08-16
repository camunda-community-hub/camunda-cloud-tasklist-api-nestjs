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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanRequestsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const loan_requests_service_1 = require("./loan-requests.service");
const constants_1 = require("./constants");
const loan_requests_filters_args_1 = require("./dto/loan-requests-filters.args");
const loan_request_entity_1 = require("./entities/loan-request.entity");
let LoanRequestsResolver = class LoanRequestsResolver {
    constructor(loanRequests) {
        this.loanRequests = loanRequests;
    }
    approve(id, creditScore) {
        return this.loanRequests.setRequestDecision(id, constants_1.APPROVED.yes, creditScore);
    }
    decline(id, creditScore) {
        return this.loanRequests.setRequestDecision(id, constants_1.APPROVED.no, creditScore);
    }
    requests(args) {
        return this.loanRequests.getRequests(args);
    }
    request(id) {
        return this.loanRequests.getRequest(id);
    }
};
__decorate([
    graphql_1.Mutation(() => loan_request_entity_1.LoanRequest),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.ID })),
    __param(1, graphql_1.Args('creditScore', { type: () => graphql_1.Float })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], LoanRequestsResolver.prototype, "approve", null);
__decorate([
    graphql_1.Mutation(() => loan_request_entity_1.LoanRequest),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.ID })),
    __param(1, graphql_1.Args('creditScore', { type: () => graphql_1.Float })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], LoanRequestsResolver.prototype, "decline", null);
__decorate([
    graphql_1.Query(() => [loan_request_entity_1.LoanRequest], { name: 'loanRequests' }),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loan_requests_filters_args_1.LoanRequestsFiltersArgs]),
    __metadata("design:returntype", void 0)
], LoanRequestsResolver.prototype, "requests", null);
__decorate([
    graphql_1.Query(() => loan_request_entity_1.LoanRequest, { name: 'loanRequest' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoanRequestsResolver.prototype, "request", null);
LoanRequestsResolver = __decorate([
    graphql_1.Resolver(() => loan_request_entity_1.LoanRequest),
    __metadata("design:paramtypes", [loan_requests_service_1.LoanRequestsService])
], LoanRequestsResolver);
exports.LoanRequestsResolver = LoanRequestsResolver;
//# sourceMappingURL=loan-requests.resolver.js.map