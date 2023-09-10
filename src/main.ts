import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import * as session from "express-session";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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
    await app.listen(3000);
}
bootstrap();
