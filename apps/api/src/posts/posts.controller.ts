import { Body, Controller, Get, Param, Post as HttpPost } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @HttpPost()
  create(@Body() dto: CreatePostDto): Promise<Post> {
    return this.postsService.create(dto);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Post | undefined> {
    return this.postsService.findById(id);
  }
}
