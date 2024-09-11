import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITODO } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = 'http://localhost:5080/api/Todo';

  constructor(private http: HttpClient) { }

  getToDos() {
    return this.http.get<ITODO[]>('http://localhost:5080/api/Todo');
  }

  addTodo(content: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Ensure the content is sent as a JSON string
    const body = JSON.stringify({ content });

    return this.http.post<ITODO>(this.apiUrl, body, { headers });
  }

  deleteTodo(id: number) {
    return this.http.delete<ITODO>(`http://localhost:5080/api/Todo/${id}`);
  }
}
