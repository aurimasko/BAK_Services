using BAK_Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Repositories.Course
{
    public interface ICourseRepository : IGenericRepository<Models.Course>
    {
        Task<Response<Models.Course>> UpdateAsync(Models.Course updatableCourse, Models.Course Course);
    }
}