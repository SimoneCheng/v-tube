import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiProperty({
    example: '2023-09-02T12:00:00Z',
    description: 'The date when the user was created',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-09-02T12:00:00Z',
    description: 'The date when the user was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiHideProperty()
  @Column({ nullable: true })
  resetPasswordToken: string;

  @ApiHideProperty()
  @Column({ nullable: true })
  resetPasswordExpires: Date;
}
