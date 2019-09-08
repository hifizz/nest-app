import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { PhotoModule } from './photo/photo.module';
import { CatsController } from './cats/cats.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CatsModule,
    PhotoModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      // .exclude(
      //   { path: 'cats', method: RequestMethod.GET },
      //   { path: 'cats', method: RequestMethod.POST }
      // )
      .forRoutes(CatsController);
  }
}
