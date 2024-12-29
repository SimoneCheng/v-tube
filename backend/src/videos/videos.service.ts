import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Repository } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class VideosService {
  private readonly s3Client: S3Client;

  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {
    // 初始化 S3 客戶端
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadVideo(
    file: Express.Multer.File,
    title: string,
    description: string,
    user: any,
  ): Promise<Video> {
    // 生成 S3 的檔案路徑
    const originalName = file.originalname;
    const timestamp = new Date().getTime();
    const key = `videos/${timestamp}-${originalName}`;

    try {
      // 上傳到 S3
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: 'video/mp4',
        ContentDisposition: `inline; filename="${originalName}"`,
        Metadata: {
          originalname: originalName,
        },
      });
      await this.s3Client.send(command);

      // 建立 S3 的公開 URL
      const videoUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/${key}`;

      // 儲存到資料庫
      const video = new Video();
      video.title = title;
      video.description = description;
      video.url = videoUrl;
      video.uploaderId = user.userId;
      video.views = 0;
      video.uploadedAt = new Date();
      video.s3Key = key;
      return this.videoRepository.save(video);
    } catch (error) {
      throw new Error(`Failed to upload video: ${error.message}`);
    }
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
