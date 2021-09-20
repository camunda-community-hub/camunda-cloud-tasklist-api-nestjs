# How to build an application using the Tasklist API and NestJS

The Tasklist API provides a simple way for you to build apps powered by BPMN that require human interaction.
On this example we'll use NestJS, one of the most popular Node.js backend frameworks, to a build a loan request review application.

## Getting started

To do this tutorial we'll need:

- Node v14+
- The [NestJS CLI](https://docs.nestjs.com/cli/overview) tool. You can install it by running `npm install -g @nestjs/cli`
- [A cluster on Camunda Cloud](https://docs.camunda.io/docs/product-manuals/cloud-console/manage-clusters/create-cluster)
- [A set of API credentials, remember to check the Tasklist option when creating them.](https://docs.camunda.io/docs/product-manuals/cloud-console/manage-clusters/manage-api-clients) Don't forget to save these, we'll need them later.
- [To clone this repo](https://github.com/camunda-community-hub/camunda-cloud-tasklist-api-nestjs)

## Before we go ahead

If you followed the steps before you should have cloned the base example repo into a folder, inside that folder you'll find some files and 2 folders, one called `demo-data/` and another called `frontend/`. As it might be evident inside of each of these folders there are 2 different projects. The former will be responsible by deploying the demo process into Zeebe and generating instances for that process. The later is a frontend application that will consume our API, this project is boostrapped with [Vite](https://vitejs.dev), [bulma](https://bulma.io) for styling and [react-query](https://react-query.tanstack.com)

## Creating a new NestJS application

Now let's bootstrap our NestJS app, to do that:

- Open your terminal and go to the cloned repository folder
- Run `nest new api`
- Pick `yarn` as a package manager

This will create the NestJS project for us inside the `api/` folder, we can clean up the project a bit and remove the files `api/app.controller.spec.ts`, `api/app.controller.ts` and `api/app.service.ts`.
We can also remove the references from the deleted files in `api/app.module.ts`, the file should look like this:

```ts
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

To check if everything is working as expected you can run `yarn workspace api run start:dev` from the root folder on your terminal. You should see a message similar like the one below:

```sh
[00:00:00 AM] Starting compilation in watch mode...
[00:00:00 AM] Found 0 errors. Watching for file changes.
[Nest] 46621  - 00/00/0000, 00:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 46621  - 00/00/0000, 00:00:00 AM     LOG [InstanceLoader] AppModule dependencies initialized +12ms
[Nest] 46621  - 00/00/0000, 00:00:00 AM     LOG [NestApplication] Nest application successfully started +3ms
```

## Generating the Tasklist service

Now inside the `api/` folder we'll need to generate a service that will be responsible for accessing the Tasklist API. To do that:

- Run `nest g service`
- You'll be prompted to pick a name for the service, let's pick `tasklist`
- Run `yarn add @nestjs/axios`

A folder called `tasklist/` will be created with the service definition and test, again you can delete the tests if you wish. We also installed the package `@nestjs/axios` so we can make requests to the Tasklist API.
To use make HTTP requests we need to inject the module into the service, like below:

```ts
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class TasklistService {
  constructor(private readonly http: HttpService) {}
}
```

Now were ready to make requests to the API, but first let's define a DTO with the shape of the tasks were going to request. For that we can create a file in `tasklist/dto/task.dto.ts`. There we can define the DTO like:

```ts
type Variable = {
  name: string;
  value: string;
};

export class TaskDto {
  id: string;
  name: string;
  processName: string;
  creationTime: string;
  completionTime: string | null;
  assignee: string | null;
  variables: Variable[];
  taskState: 'CREATED' | 'COMPLETED' | 'CANCELED';
  sortValues: [string, string];
  isFirst: boolean | null;
  formKey: string | null;
  processDefinitionId: string;
  taskDefinitionId: string;
}
}
```

We can implement the requests, for that we need to define the Tasklist API query and define the methods on the service:

```ts
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { TaskDto } from "./dto/task.dto";

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

type QueryVariables = {
  pageSize?: number;
  searchAfter?: [string, string];
  searchBefore?: [string, string];
  state?: "CREATED" | "COMPLETED";
  taskDefinitionId?: string;
};

@Injectable()
export class TasklistService {
  constructor(private readonly http: HttpService) {}

  async getTasks(variables: QueryVariables): Promise<TaskDto[]> {
    const { http } = this;
    const { errors, data } = (
      await firstValueFrom(
        http.post("/", {
          /*
           for simplicity we just used Axios here, but since the Tasklist API is a GraphQL API
           a package like `graphql-request` might be better suited for this
          */
          query: getTasksQuery,
          variables,
        })
      )
    ).data;

    if (errors) {
      // handle error
    }

    return data.tasks;
  }
}
```

For the sake of brevity we only have one query and one method here, to see the complete implementation you can check this [file](https://github.com/camunda-community-hub/camunda-cloud-tasklist-api-nestjs/blob/2-generating-tasklist-service/api/src/tasklist/tasklist.service.ts)

## Handling the Tasklist API authentication

We have the implementation of our service, but we still can't make requests to the Tasklist API because we're not providing any credentials to the API.
To achieve this we need to rename the file `.env.example` to `.env` (the file needs to be on the root because we'll reuse it to generate the demo data), and the content of this file should look like this:

```sh
ZEEBE_ADDRESS="<cluster-id>.bru-2.zeebe.camunda.io:443"
ZEEBE_CLIENT_ID="k2FKt_PNMrRUFQO-QOR9MtCygvGsT.sm"
ZEEBE_CLIENT_SECRET="C-o5WFhvoZKv4-oQGHWg~d2MObjdr-GUv3cdqRS3~6fCoHaLleEEwnOqRToQvWda"
ZEEBE_AUTHORIZATION_SERVER_URL="https://login.cloud.camunda.io/oauth/token"
TASKLIST_API_ADDRESS="https://bru-2.tasklist.camunda.io/<cluster-id>/graphql"
ZEEBE_AUTHORIZATION_AUDIENCE="tasklist.camunda.io"
```

You can find all this information on the tab `API` in our cluster page, the client id and secret should be on the file you downloaded on the Getting started section.
Now we have our credentials we can authenticate and inject the JWT token into every request we make into Tasklist API.
For that we need to turn our tasklist service into part of a module, run `nest g module` and name it `tasklist`, the same we named the service. This will generate the module file and update `app.module.ts`.
We need to edit the `app.module.ts` file to use only the module:

```ts
import { Module } from "@nestjs/common";
import { TasklistModule } from "./tasklist/tasklist.module";

@Module({
  imports: [TasklistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

We can install the package `@nestjs/config` and finally implement the authentication:

```ts
import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule, HttpService } from "@nestjs/axios";
import { TasklistService } from "./tasklist.service";
import { firstValueFrom, map } from "rxjs";

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
      envFilePath: "../.env",
    }),
  ],
  providers: [TasklistService],
  exports: [TasklistService, HttpModule, ConfigModule],
})
export class TasklistModule implements OnModuleInit {
  logger = new Logger(TasklistModule.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService
  ) {}

  public async onModuleInit() {
    const {
      http: { axiosRef },
      config,
      logger,
    } = this;
    const credentials = await this.fetchCredentials();

    logger.log("Tasklist credentials fetched");

    axiosRef.defaults.baseURL = config.get("TASKLIST_API_ADDRESS");
    axiosRef.defaults.headers[
      "Authorization"
    ] = `Bearer ${credentials.access_token}`;
    axiosRef.defaults.headers["Content-Type"] = "application/json";
    setTimeout(this.onModuleInit.bind(this), credentials.expires_in * 1000); // we need convert minutes to milliseconds
  }

  private async fetchCredentials() {
    const { http, config } = this;

    return firstValueFrom(
      http
        .post<AuthResponse>(config.get("ZEEBE_AUTHORIZATION_SERVER_URL"), {
          client_id: config.get("ZEEBE_CLIENT_ID"),
          client_secret: config.get("ZEEBE_CLIENT_SECRET"),
          audience: config.get("ZEEBE_AUTHORIZATION_AUDIENCE"),
          grant_type: "client_credentials",
        })
        .pipe(map((response) => response.data))
    );
  }
}
```

This will make that when this module is initialised we read the credentials using the `@nestjs/config` package, authenticate into the API and inject the JWT into Axios. We also set a timeout to request a new token when the first one expires.

## Creating your application API

Now we're able to implement our actual business logic, but first we need to install some packages to create our custom GraphQL API. Run `yarn add @nestjs/graphql graphql apollo-server-express`.
We'll have to generate a module, a service and a resource. To achieve that run the following commands:

```sh
nest g module
nest g service
nest g resource
```

Use the name `loanRequests` for all options. For the resource generation select the option `GraphQL (code first)` and you don't have to generate the CRUD entrypoints.

We can now change our `app.module.ts` file to its final form:

```ts
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { LoanRequestsModule } from "./loan-requests/loan-requests.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    LoanRequestsModule,
  ],
})
export class AppModule {}
```

And the `loan-requests/loan-requests.module.ts` to:

```ts
import { Module } from "@nestjs/common";
import { LoanRequestsService } from "./loan-requests.service";
import { TasklistModule } from "src/tasklist/tasklist.module";
import { LoanRequestsResolver } from "./loan-requests.resolver";

@Module({
  imports: [TasklistModule],
  providers: [LoanRequestsResolver, LoanRequestsService],
  exports: [LoanRequestsService, TasklistModule],
})
export class LoanRequestsModule {}
```

We just need to implement the service, which will have 3 methods (1 to get all requests, 1 to get a single request and 1 to make a decision) and the 4 resolvers for the GraphQL API (2 mutations and 2 queries). You can find the full implementation [here](https://github.com/camunda-community-hub/camunda-cloud-tasklist-api-nestjs/tree/4-application/api/src/loan-requests).

You can run `yarn start:dev` inside the `api/` folder and the NestJS app should start without errors.
To test your API you can access `localhost:3000/graphl` on your browser and should see our custom GraphQL API playground.

## Demo data generation and sample frontend

To test our app with the a real frontend we can change the port inside `api/main.ts` to `6000`. And then run from the root folder `yarn start:demo-data` to start the backend, frontend and demo data generation or just `yarn start` if you don't need any new data.
