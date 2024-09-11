using System.ComponentModel.DataAnnotations;

namespace todo_api.Models.Domain;

public class Todo
{
    public int Id { get; set; }
    public string Content { get; set; }
}