import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMemoRequestDto } from './dto/createMemoRequest.dto';
import { memoResponseDto } from './dto/memoResponse.dto';
import { MemoService } from './memo.service';

@Controller('api/memos')
export class MemoController {
  constructor(private readonly memoservice: MemoService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createMemo(
    @Body() createMemoDto: CreateMemoRequestDto,
  ): Promise<memoResponseDto> {
    return this.memoservice.createMemo(createMemoDto);
  }
}
