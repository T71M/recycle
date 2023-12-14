import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as express from 'express';
@Module({
  imports: [
    PrismaModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './files',
        storage: diskStorage({
          destination: './files',
          filename: (_, file, cb) => {
            const uniqueName = uuidv4();
            const fileExtName = path.extname(file.originalname);
            cb(null, `${uniqueName}${fileExtName}`);
          },
        }),
      }),
    }),
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.static(path.join(__dirname, '..', '..', 'files')))
      .forRoutes({
        path: '/files', // Путь к вашим файлам
        method: RequestMethod.GET,
      });
  }
}
