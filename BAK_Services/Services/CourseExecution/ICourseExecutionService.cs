using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.DTO;
using BAK_Services.Models;

namespace BAK_Services.Services.CourseExecution
{
    public interface ICourseExecutionService
    {
        Task<Response<IEnumerable<Models.Entities.CourseExecution>>> GetByUserIdAsync(Guid userId);
        Task<Response<Models.Entities.CourseExecution>> GetAsync(Guid id);
        Task<Response<Models.Entities.CourseExecution>> Add(CourseExecutionDto courseExecutionDto);
    }
}
