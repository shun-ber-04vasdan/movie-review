import { PostsService } from './posts.service';
import type { PostType } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<PostType[]>;
    create(dto: CreatePostDto): Promise<PostType>;
    findById(id: string): Promise<PostType | undefined>;
}
