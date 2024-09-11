import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITODO } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getToDos(){
    return this.http.get<ITODO[]>('http://localhost:5080/api/Todo');
  }

  addTodo(content: string){
    return this.http.post<ITODO>('http://localhost:5080/api/Todo', content);
  }

  deleteTodo(id: number){
    return this.http.delete<ITODO>(`http://localhost:5080/api/Todo/${id}`);
  }
}
