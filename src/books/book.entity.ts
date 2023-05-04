import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn() //Decorador para indicar que es una clave primaria autonumérica
    id: number;

    @Column()
    title: string;

    @Column()
    genre: string;

    @Column('text') //Decorador para permitir texto largo
    desceiption: string;

    @Column()
    author: string;

    @Column()
    publisher: string;

    @Column()
    pages: number;

    @Column()
    image_ul: string;
}