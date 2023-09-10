import {Module} from "@nestjs/common";
import {PostModule} from "./post/post.module";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        PostModule,
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
            load: [],
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DATABASE_HOST,
            port: 3306,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: "SSM",
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
            timezone: "local",
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
