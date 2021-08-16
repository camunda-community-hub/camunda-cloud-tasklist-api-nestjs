import { Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class TasklistModule implements OnModuleInit {
    private readonly http;
    private readonly config;
    logger: Logger;
    constructor(http: HttpService, config: ConfigService);
    onModuleInit(): Promise<void>;
    private fetchCredentials;
}
