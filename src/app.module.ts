import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    BooksModule, //Importación del módulo
    TypeOrmModule.forRoot( //Configuración de los valores de TypeORM
      configService.getTypeOrmConfig(),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}