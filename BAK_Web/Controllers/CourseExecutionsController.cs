using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.DTO;
using BAK_Services.Services.CourseExecution;
using BAK_Web.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace BAK_Web.Controllers
{
    [ApiAuthorize]
    [ApiController]
    public class CourseExecutionsController : ControllerBase
    {
        private readonly ICourseExecutionService _courseExecutionService;

        public CourseExecutionsController(ICourseExecutionService courseExecutionService)
        {
            _courseExecutionService = courseExecutionService;
        }

        [HttpGet]
        [Route("api/[controller]/")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            var response = await _courseExecutionService.GetAllAsync();

            if (response.IsSuccess)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(Guid id)
        {
            var response = await _courseExecutionService.GetAsync(id);

            if (response.IsSuccess)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet]
        [Route("api/users/{userId}/[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByUser(Guid userId)
        {
            var response = await _courseExecutionService.GetByUserIdAsync(userId);

            if (response.IsSuccess)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpPost]
        [Route("api/[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] CourseExecutionDto courseExecutionDto)
        {
            var result = await _courseExecutionService.Add(courseExecutionDto);

            if (!result.IsSuccess)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost]
        [Route("api/[controller]/evaluate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Evaluate([FromBody] CourseExecutionDto courseExecutionDto)
        {
            var result = await _courseExecutionService.Evaluate(courseExecutionDto);

            if (!result.IsSuccess)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
