<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Clean Architecture principles

```bash
src/
│
├── domain/                 # Business logic (Entities + Interfaces)
│   ├── entities/
│   ├── repositories/
│   └── types/
│
├── use-cases/             # Application logic (UseCases/Services)
│   ├── user/
│   │   ├── create-user.use-case.ts
│   │   ├── get-user.use-case.ts
│   │   └── ...
│   └── auth/
│
├── infrastructure/        # Frameworks, DBs, and external services
│   ├── keycloak/
│   ├── protos/
│   ├── database/
│   │   ├── repositories/
│   │   │   └── user.repository.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   └── auth/
│       └── jwt.strategy.ts
│
├── presentation/            # Controllers, Resolvers, DTOs, etc.
│   ├── grpc/
│   │   ├── user/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.module.ts
│   │   │   └── dtos/
│   │── graphql/ (optional)
│   └── http/ (optional)
│
├── common/                # Common utilities, base classes, etc.
│   ├── constants/
│   ├── decorators/
│   ├── utils/
│   └── exceptions/
│
├── main.ts
└── app.module.ts

```

📦 Example Use Case Flow (Creating a User)

HTTP request → user.controller.ts in presentation/http

DTO → use-case input → passed into create-user.use-case.ts

Use case calls UserRepository (from domain/repositories)

Repository implementation in infrastructure/database/repositories/

Response returned back up through controller.

# Integrate Tempo with NestJS

Integrating **Grafana Tempo** with a **NestJS** application involves using **OpenTelemetry SDK for Node.js**, then exporting traces to Tempo via the **OTLP protocol**. You can also optionally use an **OpenTelemetry Collector** as an intermediate layer, but it's not required if Tempo accepts OTLP directly (which it usually does).

---

## ✅ Goal

- Automatically trace HTTP requests, services, and DB calls inside your **NestJS** app.
- Export traces to **Tempo** via OTLP (HTTP or gRPC).
- Visualize traces in **Grafana** (linked to Tempo).

---

## 🧰 Tools Needed

| Tool                                         | Purpose                           |
| -------------------------------------------- | --------------------------------- |
| `@opentelemetry/sdk-node`                    | Node.js OpenTelemetry SDK         |
| `@opentelemetry/instrumentation-http`        | HTTP request tracing              |
| `@opentelemetry/instrumentation-nestjs-core` | NestJS-specific tracing           |
| `@opentelemetry/exporter-trace-otlp-http`    | Export traces to Tempo            |
| Grafana Tempo                                | Trace backend (already installed) |

---

## 🧱 Step-by-Step: Setup OpenTelemetry in NestJS

---

### 📦 1. Install Dependencies

```bash
npm install \
  @opentelemetry/sdk-node \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/instrumentation-nestjs-core \
  @opentelemetry/instrumentation-http \
  @opentelemetry/instrumentation-express \
  @opentelemetry/instrumentation-pg \
  @opentelemetry/exporter-trace-otlp-http \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions
```

---

### 🧠 2. Create `tracing.ts`

This sets up the OpenTelemetry SDK and sends data to Tempo.

```ts
// tracing.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'nestjs-app',
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'http://tempo.monitoring.svc.cluster.local:4318/v1/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk
  .start()
  .then(() => console.log('✅ Tracing initialized'))
  .catch((err) => console.error('❌ Error initializing tracing', err));
```

---

### ⚙️ 3. Load Tracing Before NestJS Starts

In your `main.ts`, **import `tracing.ts` before anything else**:

```ts
// main.ts
import '../tracing'; // 👈 Make sure this is first
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

---

### 🌐 4. Confirm Tempo Receives Traces

- Make some requests to your NestJS app.
- Go to **Grafana → Explore → Tempo**.
- Use `service.name = nestjs-app` as a filter.
- You should see traces and spans with full path/timing breakdown.

---

### 🧪 5. Optional: Add Manual Spans (Advanced)

You can manually instrument critical parts:

```ts
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('custom');

async function criticalFunction() {
  const span = tracer.startSpan('important-work');
  try {
    // your logic
  } finally {
    span.end();
  }
}
```

---

## 📌 Tip: Using NestJS Interceptor (Optional)

You can add custom span logging via NestJS interceptors for deeper logic instrumentation (e.g., service-level trace IDs).

---

## ✅ Summary

| What you did           | Tool                                         |
| ---------------------- | -------------------------------------------- |
| Tracing SDK setup      | `@opentelemetry/sdk-node`                    |
| NestJS instrumentation | `@opentelemetry/instrumentation-nestjs-core` |
| Trace export to Tempo  | `@opentelemetry/exporter-trace-otlp-http`    |
| Visualization          | Grafana + Tempo                              |
