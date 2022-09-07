import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './entity/memo.entity';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Memo])],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
