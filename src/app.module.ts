import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ChatModule } from './chat/chat.module';
import { CartModule } from './cart/cart.module';
import { FavoriteModule } from './favorite/favorite.module';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { Cart } from './cart/entities/cart.entity';
import { Favorite } from './favorite/entities/favorite.entity';
import { Message } from './message/entities/message.entity';
import { Chat } from './chat/entities/chat.entity';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateway/gateway.module';
import { UsedRefresh } from './auth/entities/used-refresh.entity';
import { TypeModule } from './type/type.module';
import { PropertyModule } from './property/property.module';
import { Property } from './property/entities/property.entity';
import { Type } from './type/entities/type.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Category, User, Product, Cart, Favorite, Message, Chat, UsedRefresh, Property, Type],
      synchronize: true,
      autoLoadEntities: true,
    }),

    CategoryModule,
    MessageModule,
    UserModule,
    ProductModule,
    ChatModule,
    CartModule,
    FavoriteModule,
    AuthModule,
    GatewayModule,
    TypeModule,
    PropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
