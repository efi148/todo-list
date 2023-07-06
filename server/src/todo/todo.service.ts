import { Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { Todo } from './entities/todo.entity';
import { generateUid } from 'src/utilities/utilities';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {

    const newTodo = new Todo(generateUid(), createTodoDto.title, createTodoDto.description);
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return null;
    }
    const updatedTodo: Todo = { ...todo, ...updateTodoDto };
    this.todos = this.todos.map((t) => (t.id === id ? updatedTodo : t));
    return updatedTodo;
  }

  remove(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return false;
    }
    this.todos.splice(index, 1);
    return true;
  }
}
