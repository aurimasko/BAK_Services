using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.DTO;
using BAK_Services.Models;
using BAK_Services.Models.Entities;
using BAK_Services.Services.Course;
using BAK_Services.Services.TaskExecution;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BAK_Services.Controllers
{
   // [Authorize]
    [ApiController]
    public class TaskExecutionsController : ControllerBase
    {
        private readonly ITaskExecutionService _taskExecutionService;

        public TaskExecutionsController(ITaskExecutionService taskExecutionService)
        {
            _taskExecutionService = taskExecutionService;
        }

        [HttpPost]
        [Route("[controller]/Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(IEnumerable<Guid> taskExecutionsIds = null)
        { 
            var response = await _taskExecutionService.GetAsync(taskExecutionsIds);

            if (response.IsSuccess)
                return Ok(response);
            else
                return BadRequest(response);
        }

        [HttpGet]
        [Route("tasks/{taskId}/taskExecutions")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByTaskId(Guid taskId)
        {
            var response = await _taskExecutionService.GetByTaskIdAsync(taskId);

            if (response.IsSuccess)
                return Ok(response);
            else
                return BadRequest(response);
        }

        [HttpPost]
        [Route("[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromForm] TaskExecutionDto taskExecutionDto)
        {
            var result = _taskExecutionService.AddAsync(taskExecutionDto);

            if (!result.IsSuccess)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPut]
        [Route("[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put([FromBody] TaskExecutionDto taskExecutionDto)
        {
        /*    var response = await _taskExecutionService.UpdateAsync(course);
            if (response.IsSuccess)
            {
                return await Get(new List<Guid>() { response.Content.Id });
            }
            else
                return BadRequest(response);*/
        return Ok();
        }


    }
}