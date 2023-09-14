import {Module} from "@nestjs/common";
import {PostModule} from "./post/post.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        PostModule,
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
