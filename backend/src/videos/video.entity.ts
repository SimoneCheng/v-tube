import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('videos')
export class Video {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the video',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'My awesome video',
    description: 'The title of the video',
  })
  @Column({ length: 100, nullable: false })
  title: string;

  @ApiProperty({
    example: 'This is a description of my video',
    description: 'The description of the video',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    example: '/uploads/videos/my-video.mp4',
    description: 'The URL of the video file',
  })
  @Column({ nullable: false })
  url: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who uploaded the video',
  })
  @Column({ name: 'uploaderId', nullable: false })
  uploaderId: number;

  @ApiProperty({
    example: 1000,
    description: 'The number of views for the video',
  })
  @Column({ default: 0 })
  views: number;

  @ApiProperty({
    example: '2023-05-20T12:34:56Z',
    description: 'The date and time when the video was uploaded',
  })
  @CreateDateColumn({ name: 'uploadedAt' })
  uploadedAt: Date;
}
