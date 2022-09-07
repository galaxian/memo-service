import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MemoResponseDto } from '../dto/memoResponse.dto';

@Entity()
export class Memo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  toResponse(): MemoResponseDto {
    return {
      memoId: this.id,
      title: this.title,
      content: this.content,
    };
  }
}
