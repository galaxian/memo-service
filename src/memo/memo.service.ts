import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemoRequestDto } from './dto/createMemoRequest.dto';
import { Memo } from './entity/memo.entity';
import * as bcrypt from 'bcryptjs';
import { MemoResponseDto } from './dto/memoResponse.dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>,
  ) {}

  async createMemo(
    createMemoDto: CreateMemoRequestDto,
  ): Promise<MemoResponseDto> {
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

  async findAllMemo(): Promise<MemoResponseDto[]> {
    const result: Memo[] = await this.memoRepository.find();

    const response: MemoResponseDto[] = [];
    result.forEach((element) => {
      response.push(element.toResponse());
    });

    return response;
  }

  async findMemo(id: number): Promise<MemoResponseDto> {
    const findMemo: Memo = await this.memoRepository.findOneBy({ id });

    if (!findMemo) {
      throw new NotFoundException(`${id}번 메모가 존재하지 않습니다.`);
    }

    const response: MemoResponseDto = findMemo.toResponse();

    return response;
  }
}
