using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Authentication;
using BAK_Services.DTO;
using BAK_Services.Models;
using BAK_Services.Services.Course;
using BAK_Web.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BAK_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [ApiAuthorize]
        [HttpPost]
        [Route("Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromBody]IEnumerable<Guid> CoursesId = null)
        { 
            var response = await _courseService.GetAsync(CoursesId);

            if (response.IsSuccess)
                return Ok(response);
            else
                return BadRequest(response);
        }

        [ApiAuthorize(Role.Admin)]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromBody]CourseDto course)
        {
            var result = _courseService.Add(course);

            if(!result.IsSuccess)
                return BadRequest(result);

            return Ok(result);
        }

        [ApiAuthorize(Role.Admin)]
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put([FromBody]CourseDto course)
        {
            var response = await _courseService.UpdateAsync(course);
            if (response.IsSuccess)
            {
                return Ok(response); 
            }
            else
                return BadRequest(response);
        }

        [ApiAuthorize(Role.Admin)]
        [HttpDelete]
        [Route("{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(Guid courseId)
        {
            await _courseService.DeleteAsync(courseId);
            return Ok();
        }
    }
}