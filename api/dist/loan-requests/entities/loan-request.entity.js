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
exports.LoanRequest = exports.LoanRequestStatus = exports.LoanRequestType = void 0;
const graphql_1 = require("@nestjs/graphql");
var LoanRequestType;
(function (LoanRequestType) {
    LoanRequestType["car"] = "car";
    LoanRequestType["house"] = "house";
    LoanRequestType["general"] = "general";
})(LoanRequestType = exports.LoanRequestType || (exports.LoanRequestType = {}));
graphql_1.registerEnumType(LoanRequestType, {
    name: 'LoanRequestType',
});
var LoanRequestStatus;
(function (LoanRequestStatus) {
    LoanRequestStatus["open"] = "open";
    LoanRequestStatus["resolved"] = "resolved";
})(LoanRequestStatus = exports.LoanRequestStatus || (exports.LoanRequestStatus = {}));
graphql_1.registerEnumType(LoanRequestStatus, {
    name: 'LoanRequestStatus',
});
let LoanRequest = class LoanRequest {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", Number)
], LoanRequest.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], LoanRequest.prototype, "creationTime", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], LoanRequest.prototype, "amount", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], LoanRequest.prototype, "approved", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], LoanRequest.prototype, "assets", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], LoanRequest.prototype, "borrower", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float),
    __metadata("design:type", Number)
], LoanRequest.prototype, "creditScore", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], LoanRequest.prototype, "debt", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], LoanRequest.prototype, "decisionDate", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], LoanRequest.prototype, "requestDate", void 0);
__decorate([
    graphql_1.Field(() => LoanRequestType),
    __metadata("design:type", String)
], LoanRequest.prototype, "type", void 0);
__decorate([
    graphql_1.Field(() => LoanRequestStatus),
    __metadata("design:type", String)
], LoanRequest.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], LoanRequest.prototype, "isFirst", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], LoanRequest.prototype, "sortValues", void 0);
LoanRequest = __decorate([
    graphql_1.ObjectType()
], LoanRequest);
exports.LoanRequest = LoanRequest;
//# sourceMappingURL=loan-request.entity.js.map