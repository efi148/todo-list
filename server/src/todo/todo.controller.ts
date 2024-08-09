import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    const todo = this.todoService.findOne(+id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found!`);
    }
    return todo;
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Todo {
    const updatedTodo = this.todoService.update(+id, updateTodoDto);
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found.`);
    }
    return updatedTodo;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    const removed = this.todoService.remove(+id);
    if (!removed) {
      throw new NotFoundException(`Todo with ID ${id} not found.`);
    }
  }
}
