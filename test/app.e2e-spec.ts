import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { SignInInput } from 'src/auth/dto/sign-in.input';
import { AuthTokens } from 'src/auth/entities/auth-tokens.entity';
import { Product } from 'src/product/entities/product.entity';
import { UpdateProductInput } from 'src/product/dto/update-product.input';
import { CreateProductInput } from 'src/product/dto/create-product.input';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

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

  const mockLoginUser: SignInInput = {
    email: 'vasser1man@yandex.ru',
    password: 'Raskat561',
  };

  const signInData: AuthTokens = {
    expires_in: null,
    access_token: null,
    refresh_token: null,
    token_type: null,
  };

  let user_id: number;

  describe(gql, () => {
    it('Авторизация пользователя', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
            mutation {
              SignIn(input: { email: "${mockLoginUser.email}", password: "${mockLoginUser.password}"}) { 
                user_id
                token_type
                access_token
                expires_in
                refresh_token 
            }
        }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.SignIn).toEqual(
            expect.objectContaining({
              user_id: expect.any(Number),
              token_type: expect.any(String),
              access_token: expect.any(String),
              refresh_token: expect.any(String),
            }),
          );

          user_id = res.body.data.SignIn.user_id;
          signInData.token_type = res.body.data.SignIn.token_type;
          signInData.access_token = res.body.data.SignIn.access_token;
          signInData.refresh_token = res.body.data.SignIn.refresh_token;
        });
    });
  });

  describe(gql, () => {
    let product: Product;
    let categories: Array<Category>;
    let users: Array<User>;

    it('Получение списка пользователей', () => {
      return request(app.getHttpServer())
        .post(gql)
        .set(
          'Authorization',
          `${signInData.token_type} ${signInData.access_token}`,
        )
        .send({
          query: `{
          users {
            id
            first_name
            last_name
            email
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          users = res.body.data.users;

          expect(res.body.data.users).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                first_name: expect.any(String),
                last_name: expect.any(String),
                email: expect.any(String),
              }),
            ]),
          );
        });
    });

    it('Получение списка товаров', () => {
      return request(app.getHttpServer())
        .post(gql)
        .set(
          'Authorization',
          `${signInData.token_type} ${signInData.access_token}`,
        )
        .send({
          query: `{
          products {
            id
            title
            description
            created_at
            updated_at
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          product = res.body.data.products[0];

          expect(res.body.data.products).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String),
              }),
            ]),
          );
        });
    });

    it('Получение списка категорий', () => {
      return request(app.getHttpServer())
        .post(gql)
        .set(
          'Authorization',
          `${signInData.token_type} ${signInData.access_token}`,
        )
        .send({
          query: `{
          categories {
            id
            name
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          categories = res.body.data.categories;

          expect(res.body.data.categories).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
              }),
            ]),
          );
        });
    });

    it('Получение товара по его id', () => {
      return request(app.getHttpServer())
        .post(gql)
        .set(
          'Authorization',
          `${signInData.token_type} ${signInData.access_token}`,
        )
        .send({
          query: `{
          product(id: ${product.id}) {
            id
            title
            description
            created_at
            updated_at
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.product).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
              created_at: expect.any(String),
              updated_at: expect.any(String),
            }),
          );
        });
    });

    it('Cоздание товара', () => {
      const createProductInput: Partial<CreateProductInput> = {
        title: 'Тестовый продукт',
        description: 'Тестовое описание',
        price: 4331.4,
        category: {
          id: categories[0].id,
        },
        user: {
          id: user_id,
        },
        quantity: 1,
      };

      return request(app.getHttpServer())
        .post(gql)
        .set(
          'Authorization',
          `${signInData.token_type} ${signInData.access_token}`,
        )
        .send({
          query: `
          mutation {
            createProduct(input: {
            title: "${createProductInput.title}",
            description: "${createProductInput.description}",
            price: ${createProductInput.price},
            category: {
              id: ${createProductInput.category.id},
            },
            user: {
              id: ${createProductInput.user.id},
            },
            quantity: ${createProductInput.quantity}
          }) {
            id
            title
            description
            price
            created_at
          }
        }
        `,
        })
        .expect(200)
        .expect((res) => {
          product = res.body.data.createProduct;

          expect(res.body.data.createProduct).toEqual(
            expect.objectContaining({
              title: createProductInput.title,
              description: createProductInput.description,
            }),
          );
        });
    });

    it('Обновление товара по его id', () => {
      const updateProductInput: Partial<UpdateProductInput> = {
        title: 'Тестовый продукт',
        description: 'Тестовое описание',
        price: 111111.1,
      };

      return request(app.getHttpServer())
        .post(gql)
        .set(
          'Authorization',
          `${signInData.token_type} ${signInData.access_token}`,
        )
        .send({
          query: `
          mutation {
            updateProduct(id: ${product.id}, input: {
            title: "${updateProductInput.title}",
            description: "${updateProductInput.description}",
          }) {
            id
            title
            description
            price
            created_at
          }
        }
        `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.updateProduct).toEqual(
            expect.objectContaining({
              id: product.id,
              title: updateProductInput.title,
              description: updateProductInput.description,
              created_at: product.created_at,
            }),
          );
        });
    });

    it('удаление товара', () => {
      return request(app.getHttpServer())
        .post(gql)
        .set(
          'Authorization',
          `${signInData.token_type} ${signInData.access_token}`,
        )
        .send({
          query: `
          mutation {
            deleteProduct(id: ${product.id}) {
            id
            title
            description
            price
            created_at
          }
        }
        `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(null);
        });
    });
  });
});
