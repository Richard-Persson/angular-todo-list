import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit{
  constructor(private readonly todoService: TodoService) {}
  todos: Todo[] = [];
  showCompleted: boolean = false;

  async ngOnInit(): Promise<void>{
    this.todos = await this.todoService.getTodos();
  }
  
  get filteredTodos(): Todo[] {
    return this.todos.filter(todo => todo.completed === this.showCompleted);
  }
toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
}
  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = await this.todoService.getTodos();
  }
}
