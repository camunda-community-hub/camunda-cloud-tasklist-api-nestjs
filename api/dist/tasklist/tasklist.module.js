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
var TasklistModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasklistModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const tasklist_service_1 = require("./tasklist.service");
const rxjs_1 = require("rxjs");
let TasklistModule = TasklistModule_1 = class TasklistModule {
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.logger = new common_1.Logger(TasklistModule_1.name);
    }
    async onModuleInit() {
        const { http: { axiosRef }, config, logger, } = this;
        const credentials = await this.fetchCredentials();
        logger.log('Tasklist credentials fetched');
        axiosRef.defaults.baseURL = config.get('TASKLIST_API_ADDRESS');
        axiosRef.defaults.headers['Authorization'] = `Bearer ${credentials.access_token}`;
        axiosRef.defaults.headers['Content-Type'] = 'application/json';
        setTimeout(this.onModuleInit.bind(this), credentials.expires_in * 1000);
    }
    async fetchCredentials() {
        const { http, config } = this;
        return rxjs_1.firstValueFrom(http
            .post(config.get('ZEEBE_AUTHORIZATION_SERVER_URL'), {
            client_id: config.get('ZEEBE_CLIENT_ID'),
            client_secret: config.get('ZEEBE_CLIENT_SECRET'),
            audience: config.get('ZEEBE_AUTHORIZATION_AUDIENCE'),
            grant_type: 'client_credentials',
        })
            .pipe(rxjs_1.map((response) => response.data)));
    }
};
TasklistModule = TasklistModule_1 = __decorate([
    common_1.Module({
        imports: [
            axios_1.HttpModule,
            config_1.ConfigModule.forRoot({
                envFilePath: '../.env',
            }),
        ],
        providers: [tasklist_service_1.TasklistService],
        exports: [tasklist_service_1.TasklistService, axios_1.HttpModule, config_1.ConfigModule],
    }),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], TasklistModule);
exports.TasklistModule = TasklistModule;
//# sourceMappingURL=tasklist.module.js.map