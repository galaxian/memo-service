import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemoRequestDto } from './dto/createMemoRequest.dto';
import { Memo } from './entity/memo.entity';
import * as bcrypt from 'bcryptjs';
import { MemoResponseDto } from './dto/memoResponse.dto';
import { AuthCredentialDto } from './dto/authCredential.dto';

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

    if (password.search(/[0-9]/g) < 0) {
      throw new BadRequestException('비밀번호는 숫자가 포함되어야 합니다.');
    }

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
    const result: Memo[] = await this.memoRepository.find({
      order: { createAt: 'DESC' },
    });

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

  async updateMemo(
    id: number,
    createMemoRequestDto: CreateMemoRequestDto,
  ): Promise<MemoResponseDto> {
    const findMemo: Memo = await this.memoRepository.findOneBy({ id });

    if (!findMemo) {
      throw new NotFoundException(`${id}번 메모가 존재하지 않습니다.`);
    }

    if (
      !(await bcrypt.compare(createMemoRequestDto.password, findMemo.password))
    ) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    findMemo.content = createMemoRequestDto.content;
    findMemo.title = createMemoRequestDto.title;

    const updateMemo: Memo = await this.memoRepository.save(findMemo);

    const result = updateMemo.toResponse();

    return result;
  }

  async deleteMemo(
    id: number,
    authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    const findMemo: Memo = await this.memoRepository.findOneBy({ id });

    if (!findMemo) {
      throw new NotFoundException(`${id}번 메모가 존재하지 않습니다.`);
    }

    if (
      !(await bcrypt.compare(authCredentialDto.password, findMemo.password))
    ) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    await this.memoRepository.softDelete(id);
  }

  async findAllMemoPage(page: number): Promise<MemoResponseDto[]> {
    const take = 20;

    const findMemoPage: Memo[] = await this.memoRepository.find({
      order: {
        createAt: 'DESC',
      },
      take,
      skip: (page - 1) * take,
    });

    const response: MemoResponseDto[] = [];

    findMemoPage.forEach((element) => {
      response.push(element.toResponse());
    });

    return response;
  }
}
