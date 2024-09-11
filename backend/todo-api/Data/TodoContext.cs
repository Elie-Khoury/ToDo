using Microsoft.EntityFrameworkCore;
using todo_api.Models.Domain;

namespace todo_api.Data;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {
        
    }
    public DbSet<Todo> Todos { get; set; }
}