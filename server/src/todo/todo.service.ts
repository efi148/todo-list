import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {

    constructor(@InjectRepository(Todo)
                private readonly todoRepository: Repository<Todo>,) {
    }

    findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    findOne(id: number): Promise<Todo | null> {
        return this.todoRepository.findOneBy({id});
    }

    create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo = new Todo();
        todo.title = createTodoDto.title;
        todo.description = createTodoDto.description;

        return this.todoRepository.save(todo);
    }

    async update(id: number, updateUserDto: Partial<CreateTodoDto>): Promise<Todo> {
        await this.todoRepository.update(id, updateUserDto);
        return this.findOne(id);
    }


    async remove(id: string): Promise<void> {
        await this.todoRepository.delete(id);
    }
}
