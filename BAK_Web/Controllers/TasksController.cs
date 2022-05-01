using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.DTO;
using BAK_Services.Models;
using BAK_Services.Services.Course;
using BAK_Services.Services.Task;
using BAK_Web.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace BAK_Services.Controllers
{
    [ApiAuthorize]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _tasksService;
        public TasksController(ITaskService tasksService)
        {
            _tasksService = tasksService;
        }

        [HttpPost]
        [Route("api/[controller]/Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(IEnumerable<Guid> tasksIds = null)
        {
            var response = await _tasksService.GetAsync(tasksIds);

            if (response.IsSuccess)
                return Ok(response);
            else
                return BadRequest(response);
        }


        [HttpGet]
        [Route("api/courses/{courseId}/tasks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByCourseId(Guid courseId)
        {
            var response = await _tasksService.GetByCourseIdAsync(courseId);

            if (response.IsSuccess)
                return Ok(response);
            else
                return BadRequest(response);
        }

        [HttpPost]
        [Route("api/[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromBody] TaskDto task)
        {
            var result = _tasksService.AddAsync(task);

            if (!result.IsSuccess)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPut]
        [Route("api/[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put([FromBody] TaskDto task)
        {
            var response = await _tasksService.UpdateAsync(task);

            if (response.IsSuccess)
                return Ok(response);
            
            return BadRequest(response);
        }

        [HttpDelete]
        [Route("api/[controller]/{taskId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(Guid taskId)
        {
            _tasksService.DeleteAsync(taskId);
            return Ok();
        }
    }
}
