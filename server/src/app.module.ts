import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmModuleOptions } from "./consts";

@Module({
    imports: [TodoModule, TypeOrmModule.forRoot(typeOrmModuleOptions)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}