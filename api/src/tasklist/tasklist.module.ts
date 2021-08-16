import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TasklistService } from './tasklist.service';
import { firstValueFrom, map } from 'rxjs';

type AuthResponse = {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
};

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
  ],
  providers: [TasklistService],
  exports: [TasklistService, HttpModule, ConfigModule],
})
export class TasklistModule implements OnModuleInit {
  logger = new Logger(TasklistModule.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  public async onModuleInit() {
    const {
      http: { axiosRef },
      config,
      logger,
    } = this;
    const credentials = await this.fetchCredentials();

    logger.log('Tasklist credentials fetched');

    axiosRef.defaults.baseURL = config.get('TASKLIST_API_ADDRESS');
    axiosRef.defaults.headers[
      'Authorization'
    ] = `Bearer ${credentials.access_token}`;
    axiosRef.defaults.headers['Content-Type'] = 'application/json';
    setTimeout(this.onModuleInit.bind(this), credentials.expires_in * 1000); // we need convert minutes to milliseconds
  }

  private async fetchCredentials() {
    const { http, config } = this;

    return firstValueFrom(
      http
        .post<AuthResponse>(config.get('ZEEBE_AUTHORIZATION_SERVER_URL'), {
          client_id: config.get('ZEEBE_CLIENT_ID'),
          client_secret: config.get('ZEEBE_CLIENT_SECRET'),
          audience: config.get('ZEEBE_AUTHORIZATION_AUDIENCE'),
          grant_type: 'client_credentials',
        })
        .pipe(map((response) => response.data)),
    );
  }
}
