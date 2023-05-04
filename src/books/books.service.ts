import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { BookDto } from './book.dto'; //Estructura de un libro para insertar
import { Book } from './book.entity'; //Estructura completa de un libro
import { InjectRepository } from '@nestjs/typeorm'; //Decorador para inyectar repositorios
import { Repository } from 'typeorm'; //Repositorio de TypeORM

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>, 
  ) {}

  async findAll(params): Promise<Book[]> { 
    return await this.booksRepository.find(); 
  }

  async findBook(bookId: number): Promise<Book> {
    return await this.booksRepository.findOne({ where: { id: bookId } }); 
  }

  createBook(newBook: BookDto): Promise<Book> {
    return this.booksRepository.save(newBook);
  }

  async deleteBook(bookId: string): Promise<any> {
    return await this.booksRepository.delete({ id: parseInt(bookId) });
  }

  async updateBook(bookId: number, newBook: BookDto): Promise<Book> { 
    let toUpdate = await this.booksRepository.findOneBy({id :bookId}); //Recuperación del libro a modificar

    let updated = Object.assign(toUpdate, newBook); //Asignación de todas las propiedades del libro nuevo al libro antiguo, excepto el id, que no está incluida en el libro nuevo

    return this.booksRepository.save(updated); //Almacenamiento del libro en la base de datos tras su modificación
  }
}

