import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Post[]>;
    create(dto: CreatePostDto): Promise<Post>;
    findById(id: string): Promise<Post | undefined>;
}
