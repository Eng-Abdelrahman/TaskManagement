using Mapster;
using Microsoft.Extensions.Logging;
using TaskManagement.Application.Models;
using TaskManagement.Application.Services.Interfases;
using TaskManagement.Domain.Entities;
using TaskManagement.Infrastructure.Repositories;

namespace TaskManagement.Application.Services.Implementation
{
    public class TaskService : ITaskService
    {
        private readonly IGenericRepository<TaskItem> _taskRepository;
        private readonly ILogger<TaskService> _logger;

        public TaskService(IGenericRepository<TaskItem> taskRepository, ILogger<TaskService> logger)
        {
            _taskRepository = taskRepository;
            _logger = logger;
        }

        public async Task<ServiceResponse<TaskDto>> CreateTask(TaskDto dto)
        {
            try
            {
                TaskItem task = dto.Adapt<TaskItem>();
                await _taskRepository.AddAsync(task);
                int result = await _taskRepository.SaveChangesAsync();
                return new ServiceResponse<TaskDto>() { Data = task.Adapt<TaskDto>(), Sucsess = result > 0, Message = "Task created successfully!" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating task");
                return default;
            }
        }

        public async Task<ServiceResponse<TaskDto>> UpdateTask(TaskDto dto)
        {
            try
            {
                if (dto.Id == null) return new ServiceResponse<TaskDto>() { Sucsess = false, Message = "Task not Found" };

                TaskItem task = await _taskRepository.GetByIdAsync(dto.Id.Value);
                if (task != null)
                {
                    dto.Adapt(task);
                }

                int result = await _taskRepository.SaveChangesAsync();

                return new ServiceResponse<TaskDto>() { Data = task.Adapt<TaskDto>(), Sucsess = result > 0, Message = "Task updated successfully!" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating task");
                return default;
            }
        }

        public async Task<ServiceResponse<List<TaskDto>>> ListTasks()
        {
            try
            {
                List<TaskItem> taskItems = await _taskRepository.GetAllAsync();

                return new ServiceResponse<List<TaskDto>>() { Data = taskItems.Adapt<List<TaskDto>>(), Sucsess = taskItems.Count() > 0, };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while listing tasks");
                return default;
            }
        }

        public async Task<ServiceResponse<TaskDto>> MarkComplete(long id)
        {
            try
            {
                TaskItem task = await _taskRepository.GetByIdAsync(id);
                if (task == null) return new ServiceResponse<TaskDto>() { Sucsess = false, Message = "Task not Found" };
                if (task != null)
                {
                    task.IsCompleted = true;
                }
                int result = await _taskRepository.SaveChangesAsync();
                return new ServiceResponse<TaskDto>() { Data = task.Adapt<TaskDto>(), Sucsess = result > 0, Message = "Task Completed successfully!" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while marking task as complete");
                return default;
            }
        }

        public async Task<ServiceResponse<bool>> DeleteTask(long id)
        {
            try
            {
                TaskItem task = await _taskRepository.GetByIdAsync(id);
                if (task != null)
                {
                    _taskRepository.Delete(task);
                }

                int result = await _taskRepository.SaveChangesAsync();
                return new ServiceResponse<bool>() { Data = (result > 0), Sucsess = result > 0, Message = "Task Deleted" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting task");
                return default;
            }
        }
    }
}
