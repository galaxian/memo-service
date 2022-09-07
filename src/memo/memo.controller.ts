import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { get } from 'http';
import { CreateMemoRequestDto } from './dto/createMemoRequest.dto';
import { MemoResponseDto } from './dto/memoResponse.dto';
import { MemoService } from './memo.service';

@Controller('api/memos')
export class MemoController {
  constructor(private readonly memoservice: MemoService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createMemo(
    @Body() createMemoDto: CreateMemoRequestDto,
  ): Promise<MemoResponseDto> {
    return this.memoservice.createMemo(createMemoDto);
  }

  @Get('/')
  findAllMemo(): Promise<MemoResponseDto[]> {
    return this.memoservice.findAllMemo();
  }

  @Get('/:id')
  findMemo(@Param('id') id: number): Promise<MemoResponseDto> {
    return this.memoservice.findMemo(id);
  }
}
