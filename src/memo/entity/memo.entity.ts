import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MemoResponseDto } from '../dto/memoResponse.dto';

@Entity()
export class Memo {
  @ApiProperty({
    type: Number,
    description: 'id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: '제목',
  })
  @Column({ type: 'varchar', length: 25, nullable: false })
  title: string;

  @ApiProperty({
    type: String,
    description: '내용',
  })
  @Column({ type: 'varchar', length: 250, nullable: false })
  content: string;

  @ApiProperty({
    type: String,
    description: '암호화 된 비밀번호',
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @ApiProperty({
    type: Date,
    description: '생성시간',
  })
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty({
    type: Date,
    description: '수정시간',
  })
  @UpdateDateColumn()
  updateAt: Date;

  @ApiProperty({
    type: Date,
    description: '삭제시간',
  })
  @DeleteDateColumn()
  deleteAt: Date;

  toResponse(): MemoResponseDto {
    return {
      memoId: this.id,
      title: this.title,
      content: this.content,
    };
  }
}
