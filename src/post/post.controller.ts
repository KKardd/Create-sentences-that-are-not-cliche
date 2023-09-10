import {BadRequestException, Body, Controller, Get, Param, Post, Session} from "@nestjs/common";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create-post.dto";

@Controller("post")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async save(@Body() dto: CreatePostDto): Promise<void> {
        const {title, sentence} = dto;
        await this.postService.save(title, sentence);
    }

    @Get()
    async getAll() {
        return await this.postService.getAll();
    }

    @Get("/:id")
    async incrementHit(@Param("id") id: string, @Session() session: Record<string, any>) {
        if (!session.hitsCount) {
            session.hitsCount = [];
        }
        if (!session.hitsCount.includes(id)) {
            await this.postService.incrementHit(id);
            session.hitsCount.push(id);
            console.log(session.hitsCount);
            return true;
        }
        console.log(session.hitsCount);
        throw new BadRequestException("이미 hits를 누른 게시글입니다.");
    }
}
