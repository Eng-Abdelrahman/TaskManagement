using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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


        public async Task<long> CreateTask(TaskSaveDto dto)
        {
            try
            {
                var task = new TaskItem
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    AssignedUserId = dto.AssignedUserId,
                    StartDate = dto.StartDate,
                    EndDate = dto.EndDate,
                    IsCompleted = false
                };
                await _taskRepository.AddAsync(task);
                return task.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating task");
                throw;
            }
        }

        public async Task UpdateTask(TaskSaveDto dto)
        {
            try
            {
                if (dto.Id == null) return;
                var task = await _taskRepository.GetByIdAsync(dto.Id.Value);
                if (task != null)
                {
                    task.Title = dto.Title;
                    task.Description = dto.Description;
                    task.StartDate = dto.StartDate;
                    task.EndDate = dto.EndDate;
                    await _taskRepository.UpdateAsync(task);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating task");
                throw;
            }
        }

        public async Task<List<TaskItem>> ListTasks()
        {
            try
            {
                return await _taskRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while listing tasks");
                throw;
            }
        }

        public async Task MarkComplete(long id)
        {
            try
            {
                var task = await _taskRepository.GetByIdAsync(id);
                if (task != null)
                {
                    task.IsCompleted = true;
                    await _taskRepository.UpdateAsync(task);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while marking task as complete with ID: {id}");
                throw;
            }
        }
    }
}
