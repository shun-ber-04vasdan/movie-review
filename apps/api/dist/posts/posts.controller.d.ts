import { PostsService } from './posts.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<Post[]>;
    create(dto: CreatePostDto): Promise<Post>;
    findById(id: string): Promise<Post | undefined>;
}
