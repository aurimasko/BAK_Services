using Microsoft.AspNetCore.Http;
using BAK_Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.DTO;

namespace BAK_Services.Services.Course
{
    public interface ICourseService
    {
        Task<Response<IEnumerable<Models.Course>>> GetAsync(IEnumerable<Guid> CoursesId = null);
        Response<Models.Course> Add(CourseDto course);
        Task<Response<Models.Course>> UpdateAsync(CourseDto course);
        void DeleteAsync(Guid id);
    }
}