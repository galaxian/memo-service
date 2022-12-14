import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateMemoRequestDto } from '../dto/createMemoRequest.dto';
import { MemoResponseDto } from '../dto/memoResponse.dto';
import { Memo } from '../entity/memo.entity';
import { MemoService } from '../memo.service';
import * as bcrypt from 'bcryptjs';

describe('MemoService', () => {
  let memoService: MemoService;

  jest.mock('bcryptjs', () => {
    return {
      genSalt: jest.fn(() => 'hash'),
      hash: jest.fn(() => 'hashPassword'),
    };
  });

  const mockMemoRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemoService,
        {
          provide: getRepositoryToken(Memo),
          useValue: mockMemoRepository,
        },
      ],
    }).compile();

    memoService = module.get<MemoService>(MemoService);
  });

  it('should be defined', () => {
    expect(memoService).toBeDefined();
  });

  describe('createMemo', () => {
    it('메모 작성', async () => {
      //given
      const input: CreateMemoRequestDto = {
        title: '제목',
        content: '내용',
        password: '비밀번호12',
      };

      const createMemo: Memo = {
        id: 1,
        title: '제목',
        content: '내용',
        password: 'hash비밀번호12',
        createAt: undefined,
        updateAt: undefined,
        deleteAt: undefined,
        toResponse: function (): MemoResponseDto {
          return {
            memoId: this.id,
            title: this.title,
            content: this.content,
          };
        },
      };

      mockMemoRepository.create.mockImplementation(
        (input: CreateMemoRequestDto) => createMemo,
      );
      mockMemoRepository.save.mockImplementation((memo) => createMemo);

      //when
      const result = await memoService.createMemo(input);

      //then
      expect(result).toEqual(createMemo.toResponse());
    });
  });

  describe('findAllMemo', () => {
    it('메모 전체 조회', async () => {
      //given
      const findMemos: Memo[] = [
        {
          id: 1,
          title: '제목1',
          content: '내용1',
          password: 'hash비밀번호12',
          createAt: undefined,
          updateAt: undefined,
          deleteAt: undefined,
          toResponse: function (): MemoResponseDto {
            return {
              memoId: this.id,
              title: this.title,
              content: this.content,
            };
          },
        },
        {
          id: 2,
          title: '제목2',
          content: '내용2',
          password: 'hash비밀번호12',
          createAt: undefined,
          updateAt: undefined,
          deleteAt: undefined,
          toResponse: function (): MemoResponseDto {
            return {
              memoId: this.id,
              title: this.title,
              content: this.content,
            };
          },
        },
      ];

      mockMemoRepository.find.mockResolvedValue(findMemos);

      //when
      const result = await memoService.findAllMemo();

      const expected: MemoResponseDto[] = [];

      findMemos.forEach((element) => {
        expected.push(element.toResponse());
      });

      //then
      expect(result).toEqual(expected);
    });
  });

  describe('findMemo', () => {
    it('memoId로 메모 조회', async () => {
      //given
      const findMemo: Memo = {
        id: 1,
        title: '제목1',
        content: '내용1',
        password: 'hash비밀번호',
        createAt: undefined,
        updateAt: undefined,
        deleteAt: undefined,
        toResponse: function (): MemoResponseDto {
          return {
            memoId: this.id,
            title: this.title,
            content: this.content,
          };
        },
      };

      mockMemoRepository.findOneBy.mockImplementation(({ id }) => findMemo);

      //when
      const id = 1;

      const result = await memoService.findMemo(id);

      //then
      expect(result).toEqual(findMemo.toResponse());
    });
  });
});
