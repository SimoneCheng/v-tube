import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VideosService } from './videos.service';
import { Video } from './video.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload a video' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The video has been successfully uploaded.',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 100, // 100MB 限制
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes('video/')) {
          return cb(
            new BadRequestException('Only video files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('description') description: string,
    @Request() req,
  ): Promise<Video> {
    if (!file) {
      throw new BadRequestException('Video file is required');
    }
    return this.videosService.uploadVideo(file, title, description, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all videos' })
  @ApiResponse({
    status: 200,
    description: 'Return all videos.',
    type: [Video],
  })
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a video by id' })
  @ApiResponse({ status: 200, description: 'Return the video.', type: Video })
  @ApiResponse({ status: 404, description: 'Video not found.' })
  async findOne(@Param('id') id: string): Promise<Video | null> {
    return this.videosService.findOne(+id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all videos by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Return all videos from a specific user.',
    type: [Video],
  })
  @ApiResponse({ status: 404, description: 'No videos found for this user.' })
  async findByUserId(@Param('userId') userId: string): Promise<Video[]> {
    return this.videosService.findByUserId(+userId);
  }

  @Post(':id/view')
  @ApiOperation({ summary: 'Increment video views' })
  @ApiResponse({
    status: 200,
    description: 'The video views have been incremented.',
  })
  async incrementViews(@Param('id') id: string): Promise<void> {
    await this.videosService.incrementViews(+id);
  }
}
