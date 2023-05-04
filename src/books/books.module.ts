import { Module } from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Book])], //Las entidades van aquí
  providers: [BooksService],  //El servicio
  controllers: [BooksController], //El controlador 
})
export class BooksModule {}