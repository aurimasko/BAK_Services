using BAK_Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models.Entities;

namespace BAK_Services.Repositories.Course
{
    public interface ICourseExecutionRepository : IGenericRepository<CourseExecution>
    {
        // Task<Response<Models.Course>> UpdateAsync(Models.Course updatableCourse, CourseExecution courseExecution);
        Task<IEnumerable<CourseExecution>> GetByUserIdWithCourseAsync(Guid userId);
    }
}