using Microsoft.AspNetCore.Mvc;
using TaskManagement.Application.Models;
using TaskManagement.Application.Services.Interfases;

namespace TaskManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [Route("CreateTask")]
        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskDto dto)
        {
            ServiceResponse<TaskDto> response = await _taskService.CreateTask(dto);
            return Ok(response);
        }
        [HttpPut]
        public async Task<IActionResult> Update(TaskDto dto)
        {
            ServiceResponse<TaskDto> response = await _taskService.UpdateTask(dto);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> List()
        {
            ServiceResponse<List<TaskDto>> response =  await _taskService.ListTasks();
            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            ServiceResponse<bool> response = await _taskService.DeleteTask(id);
            return Ok(response);
        }
        [HttpPatch("{id}/complete")]
        public async Task<IActionResult> MarkComplete(long id)
        {
            ServiceResponse<TaskDto> response = await _taskService.MarkComplete(id);
            return Ok(response);
        }
    }

}
