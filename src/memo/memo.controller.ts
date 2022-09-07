import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { get } from 'http';
import { AuthCredentialDto } from './dto/authCredential.dto';
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
  findMemo(@Param('id', ParseIntPipe) id: number): Promise<MemoResponseDto> {
    return this.memoservice.findMemo(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateMemo(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMemoRequestDto: CreateMemoRequestDto,
  ): Promise<MemoResponseDto> {
    return this.memoservice.updateMemo(id, createMemoRequestDto);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  deleteMemo(
    @Param('id', ParseIntPipe) id: number,
    @Body() authCredentialDto: AuthCredentialDto,
  ): void {
    this.memoservice.deleteMemo(id, authCredentialDto);
  }
}
