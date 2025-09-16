import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostType } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';

// 簡易slug（ESMのslugifyで詰まらないように自作）
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PostType[]> {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    }) as unknown as PostType[];
  }

  async create(dto: CreatePostDto): Promise<PostType> {
    const slug = toSlug(dto.title);
    const created = await this.prisma.post.create({
      data: {
        title: dto.title,
        body: dto.body ?? null,
        slug,
      },
    });
    return created as unknown as PostType;
  }

  async findById(id: string): Promise<PostType | undefined> {
    const found = await this.prisma.post.findUnique({ where: { id } });
    return found as unknown as PostType | undefined;
  }
}
