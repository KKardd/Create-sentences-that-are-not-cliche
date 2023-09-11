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

    async getPost(page: number = 1, list_num: number = 100): Promise<Array<SSMCardInfo>> {
        return this.postRepository.find({
            take: list_num,
            skip: (page - 1) * list_num,
            order: {
                createdAt: "DESC",
            },
        });
    }

    async incrementHit(postId: string) {
        const post = await this.postRepository.findOne({where: {id: postId}});
        post.hits++;
        return this.postRepository.save(post);
    }
}
