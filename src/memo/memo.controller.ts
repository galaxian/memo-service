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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { AuthCredentialDto } from './dto/authCredential.dto';
import { CreateMemoRequestDto } from './dto/createMemoRequest.dto';
import { MemoResponseDto } from './dto/memoResponse.dto';
import { MemoService } from './memo.service';

@ApiTags('메모 API')
@Controller({ path: '/memos', version: ['1', '2'] })
export class MemoController {
  constructor(private readonly memoservice: MemoService) {}

  @ApiOperation({
    summary: '메모 생성 API',
    description: '제목, 내용, 비밀번호를 사용하여 메모를 생성한다.',
  })
  @Version('1')
  @Post('/')
  @UsePipes(ValidationPipe)
  createMemo(
    @Body() createMemoDto: CreateMemoRequestDto,
  ): Promise<MemoResponseDto> {
    return this.memoservice.createMemo(createMemoDto);
  }

  @ApiOperation({
    summary: '메모 전체 조회 API',
    description: 'DB에 있는 메모들을 최신순으로 조회한다.',
  })
  @Version('1')
  @Get('/')
  findAllMemo(): Promise<MemoResponseDto[]> {
    return this.memoservice.findAllMemo();
  }

  @ApiOperation({
    summary: '메모 조회 API',
    description: '메모 id를 사용하여 메모를 조회한다.',
  })
  @Version('1')
  @Get('/:id')
  findMemo(@Param('id', ParseIntPipe) id: number): Promise<MemoResponseDto> {
    return this.memoservice.findMemo(id);
  }

  @ApiOperation({
    summary: '메모 수정 API',
    description: '제목, 내용, 비밀번호를 사용하여 메모를 수정한다.',
  })
  @Version('1')
  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateMemo(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMemoRequestDto: CreateMemoRequestDto,
  ): Promise<MemoResponseDto> {
    return this.memoservice.updateMemo(id, createMemoRequestDto);
  }

  @ApiOperation({
    summary: '메모 삭제 API',
    description: '비밀번호를 사용하여 메모를 삭제한다',
  })
  @Version('1')
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  deleteMemo(
    @Param('id', ParseIntPipe) id: number,
    @Body() authCredentialDto: AuthCredentialDto,
  ): void {
    this.memoservice.deleteMemo(id, authCredentialDto);
  }

  @ApiOperation({
    summary: 'pagination 메모 조회 API',
    description: 'page를 사용하여 해당한 페이지의 메모들을 조회한다.',
  })
  @Version('2')
  @Get('/')
  findAllMemoPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<MemoResponseDto[]> {
    return this.memoservice.findAllMemoPage(page);
  }
}
