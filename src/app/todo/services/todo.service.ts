import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  http = inject(HttpClient)
  private todoId = 1;

  // TODO replace with a get request
    async getTodos() : Promise<Todo[]> {

    return await firstValueFrom(this.http.get<Todo[]>(`${environment.apiUrl}/todo`))

  }

  async addTodo(title: string) : Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    let result = await firstValueFrom(this.http.post<Todo>(`${environment.apiUrl}/todo`,todo))
    return result
  }

  async updateTodo(updatedTodo: Todo) :  Promise<Todo> {
    // TODO: replace with a PUT request

    const todo = await firstValueFrom(this.http.get<Todo>(`${environment.apiUrl}/todo/${updatedTodo.id}`))
    todo.completed = !todo.completed

    let result =  await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/todo/${updatedTodo.id}`,todo ))
    return result

  }
}
