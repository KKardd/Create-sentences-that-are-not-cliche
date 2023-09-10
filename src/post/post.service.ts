import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "./entities/post.entity";
import {Repository} from "typeorm";
import {ulid} from "ulid";
import {SSMCardInfo} from "./SSMCardInfo";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>
    ) {}

    async save(title: string, sentence: Array<string>): Promise<PostEntity> {
        const post = new PostEntity();
        post.id = ulid();
        post.title = title;
        post.sentence = sentence;
        post.hits = 0;
        return this.postRepository.save(post);
    }

    async getAll(): Promise<Array<SSMCardInfo>> {
        return this.postRepository.find({
            order: {
                createdAt: "DESC",
            },
        });
    }
}
