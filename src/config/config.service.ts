import { TypeOrmModuleOptions } from '@nestjs/typeorm'; //Importación del módulo de configuración de TypeORM

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {
    console.log(env)
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions { //Función que configura las opciones de TypeORM
    return {
      type: 'mysql', //Configuración del gestor de base de datos a usar

      host: this.getValue('BOOKS_HOST'), //Configuración de valores mediante variables de entorno
      port: parseInt(this.getValue('BOOKS_PORT')),
      username: this.getValue('BOOKS_USER'),
      password: this.getValue('BOOKS_PASSWORD'),
      database: this.getValue('BOOKS_DATABASE'),

      entities: ['dist/**/*.entity.js'], //Especificación del directorio de entidades
      synchronize: true, //Actualización de las tablas ante cambios en las entidades
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'BOOKS_HOST',
  'BOOKS_PORT',
  'BOOKS_USER',
  'BOOKS_PASSWORD',
  'BOOKS_DATABASE',
]);

export { configService };