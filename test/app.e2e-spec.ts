import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Memo } from './../src/memo/entity/memo.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let memoRepository: Repository<Memo>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    memoRepository = moduleFixture.get(getRepositoryToken(Memo));
  });

  afterAll(async () => {
    await memoRepository.query('DELETE FROM memo');
    await memoRepository.query('ALTER SEQUENCE memo_id_seq RESTART WITH 1');
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/memos', () => {
    describe('getAll', () => {
      it('get', () => {
        return request(app.getHttpServer())
          .get('/memos')
          .expect(200)
          .expect([]);
      });
    });

    describe('post', () => {
      it('메모 작성 성공', () => {
        return request(app.getHttpServer())
          .post('/memos')
          .send({
            title: '제목',
            content: '내용',
            password: 'password12',
          })
          .expect(201);
      });
      it('비밀번호 6자 미만 시 400', () => {
        return request(app.getHttpServer())
          .post('/memos')
          .send({
            title: '제목',
            content: '내용',
            password: 'pass1',
          })
          .expect(400);
      });
      it('비밀번호 숫자 없을 시 400', () => {
        return request(app.getHttpServer())
          .post('/memos')
          .send({
            title: '제목',
            content: '내용',
            password: 'password',
          })
          .expect(400);
      });
    });

    describe('update', () => {
      it('메모 수정 성공', () => {
        return request(app.getHttpServer())
          .put('/memos/1')
          .send({
            title: '수정',
            content: '내용',
            password: 'password12',
          })
          .expect(200)
          .expect({ memoId: 1, title: '수정', content: '내용' });
      });
      it('존재하지 않는 메모 수정', () => {
        return request(app.getHttpServer())
          .put('/memos/2000')
          .send({
            title: '수정',
            content: '내용',
            password: 'password12',
          })
          .expect(404);
      });
      it('비밀번호 불일치', () => {
        return request(app.getHttpServer())
          .put('/memos/1')
          .send({
            title: '수정실패',
            content: '내용수정실패',
            password: 'password13',
          })
          .expect(401);
      });
    });
  });
});
