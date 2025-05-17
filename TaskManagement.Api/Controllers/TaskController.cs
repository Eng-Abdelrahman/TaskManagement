using Microsoft.AspNetCore.Mvc;
using TaskManagement.Application.Models;
using TaskManagement.Application.Services.Implementation;
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

        [HttpPost]
        public async Task<IActionResult> Create(TaskSaveDto dto)
        {
            var id = await _taskService.CreateTask(dto);
            return CreatedAtAction(nameof(Create), new { id }, dto);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(TaskSaveDto dto)
        {
            await _taskService.UpdateTask(dto);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var tasks = await _taskService.ListTasks();
            return Ok(tasks);
        }

        [HttpPatch("{id}/complete")]
        public async Task<IActionResult> MarkComplete(long id)
        {
            await _taskService.MarkComplete(id);
            return NoContent();
        }
    }

}
