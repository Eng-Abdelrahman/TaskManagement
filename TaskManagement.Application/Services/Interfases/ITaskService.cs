using TaskManagement.Application.Models;

namespace TaskManagement.Application.Services.Interfases;

public interface ITaskService
{
    Task<ServiceResponse<TaskDto>> CreateTask(TaskDto dto);
    Task<ServiceResponse<TaskDto>> UpdateTask(TaskDto dto);
    Task<ServiceResponse<List<TaskDto>>> ListTasks();
    Task<ServiceResponse<TaskDto>> MarkComplete(long id);
    Task<ServiceResponse<bool>> DeleteTask(long id);
}
