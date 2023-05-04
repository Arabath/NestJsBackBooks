import {
  Controller,
  Get,
  Param,
  Req,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Request } from 'express';
import { BookDto } from './book.dto';
import { Book } from './book.entity'; //El tipo de la interfaz y el de la entidad coinciden. Nos quedamos con el de la entidad

@Controller('books')
export class BooksController {

  constructor(private booksService: BooksService) {}

  @Get()
  findAll(@Req() request: Request): Promise<Book[]> { //Las funciones ahora devuelven promesas basadas en la entity
    console.log(request.query);
    return this.booksService.findAll(request.query);
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: number): Promise<Book> {
    return this.booksService.findBook(bookId);
  }

  @Post()
  createBook(@Body() newBook: BookDto): Promise<Book> { //DTO del libro a crear
    return this.booksService.createBook(newBook);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.deleteBook(bookId);
  }

  @Put(':bookId')
  updateBook(
    @Param('bookId') bookId: number,
    @Body() newBook: BookDto, //DTO del libro actualizado
  ): Promise<Book> {
    return this.booksService.updateBook(bookId, newBook);
  }
}


