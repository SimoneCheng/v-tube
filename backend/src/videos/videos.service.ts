import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async uploadVideo(
    file: Express.Multer.File,
    title: string,
    description: string,
    user: any,
  ): Promise<Video> {
    const video = new Video();
    video.title = title;
    video.description = description;
    video.url = `/uploads/videos/${file.filename}`;
    video.uploaderId = user.userId;
    video.views = 0;
    video.uploadedAt = new Date();

    return this.videoRepository.save(video);
  }

  async findAll(): Promise<Video[]> {
    const videos = await this.videoRepository.find({
      relations: {
        uploader: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        views: true,
        uploadedAt: true,
        uploaderId: true,
        uploader: {
          id: true,
          username: true,
        },
      },
    });
    return videos;
  }

  async findOne(id: number): Promise<Video | null> {
    const video = await this.videoRepository.findOne({
      where: { id },
      relations: {
        uploader: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        views: true,
        uploadedAt: true,
        uploaderId: true,
        uploader: {
          id: true,
          username: true,
        },
      },
    });

    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }

    return video;
  }

  async findByUserId(userId: number): Promise<Video[]> {
    const videos = await this.videoRepository.find({
      where: { uploaderId: userId },
      relations: {
        uploader: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        views: true,
        uploadedAt: true,
        uploaderId: true,
        uploader: {
          id: true,
          username: true,
        },
      },
    });

    if (!videos.length) {
      throw new NotFoundException(`No videos found for user ID ${userId}`);
    }

    return videos;
  }

  async incrementViews(id: number): Promise<void> {
    const result = await this.videoRepository.increment({ id }, 'views', 1);
    if (result.affected === 0) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
  }
}
