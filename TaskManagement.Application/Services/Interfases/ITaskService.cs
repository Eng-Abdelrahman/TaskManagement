using TaskManagement.Application.Models;
using TaskManagement.Domain.Entities;

namespace TaskManagement.Application.Services.Interfases;

public interface ITaskService
{
    Task<long> CreateTask(TaskSaveDto dto);
    Task UpdateTask(TaskSaveDto dto);
    Task<List<TaskItem>> ListTasks();
    Task MarkComplete(long id);
}
