import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const gql = '/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    it('should get the products array', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({ query: '{products {id title description category }}' })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.products).toEqual([]);
        });
    });
  });
});
