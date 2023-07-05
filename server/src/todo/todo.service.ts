import { Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  create(createTodoDto: CreateTodoDto) {
    const maxId = this.todos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0
    );
    
    const newTodo: Todo = {
      id: maxId + 1,
      ...createTodoDto,
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return null;
    }
    const updatedTodo = { ...todo, ...updateTodoDto };
    this.todos = this.todos.map((t) => (t.id === id ? updatedTodo : t));
    return updatedTodo;
  }

  remove(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return false;
    }
    this.todos.splice(index, 1);
    return true;
  }
}
