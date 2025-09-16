import { PrismaService } from '../prisma/prisma.service';
import { PostType } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<PostType[]>;
    create(dto: CreatePostDto): Promise<PostType>;
    findById(id: string): Promise<PostType | undefined>;
}
