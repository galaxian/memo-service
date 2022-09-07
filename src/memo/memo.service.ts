import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemoRequestDto } from './dto/createMemoRequest.dto';
import { Memo } from './entity/memo.entity';
import * as bcrypt from 'bcryptjs';
import { memoResponseDto } from './dto/memoResponse.dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>,
  ) {}

  async createMemo(
    createMemoDto: CreateMemoRequestDto,
  ): Promise<memoResponseDto> {
    const { title, content, password } = createMemoDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const memo = this.memoRepository.create({
      title,
      content,
      password: hashedPassword,
    });

    const creatMemo = await this.memoRepository.save(memo);

    return creatMemo.toResponse();
  }
}
