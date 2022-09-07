import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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
        return request(app.getHttpServer()).get('/memos').expect(200);
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
  });
});
