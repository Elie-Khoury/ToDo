import { Component, OnInit } from '@angular/core';
import { ITODO } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit{

  todo_list!: ITODO[];

  content: string = '';

  constructor(private todoService: TodoService) { }

  addTodo(content: string) {
    if(this.content == ''){
      return;
    }
    this.todoService.addTodo(content).subscribe({
      next: (item : ITODO) => {
        this.content = '';
        this.todo_list = [...this.todo_list, item]
      },
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    })
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todo_list = this.todo_list.filter((item) => item.id != id)
      },
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    })
  }

  ngOnInit(): void {

    this.todoService.getToDos().subscribe((list) => {
      this.todo_list = list;
    })
  }
}
