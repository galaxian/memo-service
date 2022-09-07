import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { get } from 'http';
import { AuthCredentialDto } from './dto/authCredential.dto';
import { CreateMemoRequestDto } from './dto/createMemoRequest.dto';
import { MemoResponseDto } from './dto/memoResponse.dto';
import { MemoService } from './memo.service';

@Controller({ path: '/memos', version: ['1', '2'] })
export class MemoController {
  constructor(private readonly memoservice: MemoService) {}

  @Version('1')
  @Post('/')
  @UsePipes(ValidationPipe)
  createMemo(
    @Body() createMemoDto: CreateMemoRequestDto,
  ): Promise<MemoResponseDto> {
    return this.memoservice.createMemo(createMemoDto);
  }

  @Version('1')
  @Get('/')
  findAllMemo(): Promise<MemoResponseDto[]> {
    return this.memoservice.findAllMemo();
  }

  @Version('1')
  @Get('/:id')
  findMemo(@Param('id', ParseIntPipe) id: number): Promise<MemoResponseDto> {
    return this.memoservice.findMemo(id);
  }

  @Version('1')
  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateMemo(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMemoRequestDto: CreateMemoRequestDto,
  ): Promise<MemoResponseDto> {
    return this.memoservice.updateMemo(id, createMemoRequestDto);
  }

  @Version('1')
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  deleteMemo(
    @Param('id', ParseIntPipe) id: number,
    @Body() authCredentialDto: AuthCredentialDto,
  ): void {
    this.memoservice.deleteMemo(id, authCredentialDto);
  }

  @Version('2')
  @Get('/')
  findAllMemoPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<MemoResponseDto[]> {
    return this.memoservice.findAllMemoPage(page);
  }
}
