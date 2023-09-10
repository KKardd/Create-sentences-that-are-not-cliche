import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "./entities/post.entity";
import {Repository} from "typeorm";
import {ulid} from "ulid";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>
    ) {}

    async save(title: string, sentence: Array<string>): Promise<any> {
        const post = new PostEntity();
        post.id = ulid();
        post.title = title;
        post.sentence = sentence;
        post.hits = 0;
        return this.postRepository.save(post);
    }

    async getAll(): Promise<any> {}

    // private async savePost(title: string, sentence: JSON) {
    //     const post = new PostEntity();
    //     post.id = ulid();
    //     post.title = title;
    //     post.sentence = sentence;
    //     post.hits = 0;
    //     return this.postRepository.save(post);
    // }
}
