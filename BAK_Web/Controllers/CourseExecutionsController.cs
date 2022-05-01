using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BAK_Services.Authentication;
using BAK_Services.DTO;
using BAK_Services.Models;
using BAK_Services.Models.Entities;
using BAK_Services.Services.CourseExecution;
using BAK_Web.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using BAK_Services.Extensions;

namespace BAK_Web.Controllers
{
    [ApiAuthorize]
    [ApiController]
    public class CourseExecutionsController : ControllerBase
    {
        private readonly ICourseExecutionService _courseExecutionService;
        private readonly IMapper _mapper;

        public CourseExecutionsController(IMapper mapper, ICourseExecutionService courseExecutionService)
        {
            _courseExecutionService = courseExecutionService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/[controller]/")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            var response = await _courseExecutionService.GetAllAsync();
            var mappedResponse = _mapper.ToDTO<IEnumerable<CourseExecutionDto>, IEnumerable<CourseExecution>>(response);

            if (mappedResponse.IsSuccess)
                return Ok(mappedResponse);

            return BadRequest(mappedResponse);
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(Guid id)
        {
            var response = await _courseExecutionService.GetAsync(id);
            var mappedResponse = _mapper.ToDTO<CourseExecutionDto, CourseExecution>(response);

            if (mappedResponse.IsSuccess)
                return Ok(mappedResponse);

            return BadRequest(mappedResponse);
        }

        [HttpGet]
        [Route("api/users/{userId}/[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByUser(Guid userId)
        {
            var response = await _courseExecutionService.GetByUserIdAsync(userId);
            var mappedResponse = _mapper.ToDTO<CourseExecutionDto, CourseExecution>(response);

            if (mappedResponse.IsSuccess)
                return Ok(mappedResponse);

            return BadRequest(mappedResponse);
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

        [ApiAuthorize(Role.Teacher)]
        [HttpPost]
        [Route("api/[controller]/evaluate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Evaluate([FromBody] CourseExecutionDto courseExecutionDto)
        {
            var result = await _courseExecutionService.Evaluate(courseExecutionDto);
            var mappedResponse = _mapper.ToDTO<CourseExecutionDto, CourseExecution>(result);

            if (!mappedResponse.IsSuccess)
                return BadRequest(mappedResponse);

            return Ok(mappedResponse);
        }
    }
}
