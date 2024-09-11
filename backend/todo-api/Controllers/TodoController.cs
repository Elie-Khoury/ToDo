using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using todo_api.Data;
using todo_api.Models;
using todo_api.Models.Domain;
using todo_api.Models.DTO;

namespace todo_api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoContext dbContext;

    public TodoController(TodoContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetList()
    {
        // Get from database - Domain Model
        var todoDomain = dbContext.Todos.ToList();

        // Map domain model to DTO
        var todoDto = new List<TodoDto>();
        foreach (var todo in todoDomain)
        {
            todoDto.Add(new TodoDto()
            {
                Id = todo.Id,
                Content = todo.Content
            });
        }

        return Ok(todoDomain);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetTodoById(int id)
    {
        var todo = dbContext.Todos.Find(id);

        if(todo == null)
        {
            return NotFound();
        }

        return Ok(todo);
    }

    [HttpPost]
    public IActionResult CreateTodo([FromBody] AddTodoRequestDto body)
    {
        // Map or Convert DTO to Domain Model
        var todoDomain = new Todo
        {
            Content = body.Content
        };

        // Use Domain Model to create Todo
        dbContext.Todos.Add(todoDomain);
        dbContext.SaveChanges();

        return CreatedAtAction(nameof(GetTodoById), new { id = todoDomain.Id }, todoDomain);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteTask([FromRoute] int id)
    {
        // Get from database - Domain Model
        var todoDomain = dbContext.Todos.ToList();

        var todo = todoDomain.FirstOrDefault(t => t.Id == id);

        if (todo == null)
        {
            return NotFound();
        }

        dbContext.Todos.Remove(todo);
        dbContext.SaveChanges();

        return Ok();
    }
}