// import {NestFactory} from "@nestjs/core";
// import {AppModule} from "./app.module";
// import {ValidationPipe} from "@nestjs/common";
// import * as session from "express-session";

// async function bootstrap() {
//     const app = await NestFactory.create(AppModule);

//     app.use(
//         session({
//             secret: process.env.SESSION_SECRET_KEY,
//             resave: false,
//             saveUninitialized: false,
//             cookie: {
//                 secure: false,
//                 maxAge: 600000, // 600초 (10분) 만료
//             },
//         })
//     );
//     app.useGlobalPipes(
//         new ValidationPipe({
//             transform: true,
//         })
//     );
//     await app.listen(3000);
// }
// bootstrap();

import {NestFactory} from "@nestjs/core";
import serverlessExpress from "@vendia/serverless-express";
import {ValidationPipe} from "@nestjs/common";
import session from "express-session";
import {Callback, Context, Handler} from "aws-lambda";
import {AppModule} from "./app.module";
import cors from "cors";

let server: Handler;

async function bootstrap(): Promise<Handler> {
    const app = await NestFactory.create(AppModule);
    await app.init();
    const corsOption = {
        origin: "*",
        optionsSuccessStatus: 200,
        credentials: true,
    };
    app.use(cors(corsOption));
    app.use(
        session({
            secret: process.env.SESSION_SECRET_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 600000, // 600초 (10분) 만료
            },
        })
    );
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    );
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({app: expressApp});
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
};
