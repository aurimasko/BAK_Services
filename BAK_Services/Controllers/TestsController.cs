using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models;
using BAK_Services.Models.Entities;
using BAK_Services.Services.Course;
using BAK_Services.Services.Test;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BAK_Services.Controllers
{
   // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TestsController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestsController(ITestService testService)
        {
            _testService = testService;
        }

        [HttpPost]
        [Route("[controller]/Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(IEnumerable<Guid> testsIds = null)
        { 
            var response = await _testService.GetAsync(testsIds);

            if (response.IsSuccess)
                return Ok(response);
            else
                return BadRequest(response);
        }


        [HttpGet]
        [Route("tasks/{taskId}/tests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByTaskId(Guid taskId)
        {
            var response = await _testService.GetByTaskIdAsync(taskId);

            if (response.IsSuccess)
                return Ok(response);
            else
                return BadRequest(response);
        }

        [HttpPost]
        [Route("[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromBody]Test test)
        {
            var result = _testService.AddAsync(test);

            if (!result.IsSuccess)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPut]
        [Route("[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put([FromBody]Course course)
        {
            /*var response = await _testService.UpdateAsync(course);
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