import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
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

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const slug = toSlug(dto.movieTitle);
    const created = await this.prisma.post.create({
      data: {
        movieTitle: dto.movieTitle,
        thumbnailUrl: dto.thumbnailUrl,
        score: dto.score,
        comment: dto.comment,
        starring: dto.starring ?? [],
        author: dto.author,
        slug,
      },
    });
    return created as unknown as Post;
  }

  async findById(id: string): Promise<Post | undefined> {
    const found = await this.prisma.post.findUnique({ where: { id } });
    return found as unknown as Post | undefined;
  }
}
