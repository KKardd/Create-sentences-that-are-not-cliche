import {Body, Controller, Get, Post} from "@nestjs/common";
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
}
