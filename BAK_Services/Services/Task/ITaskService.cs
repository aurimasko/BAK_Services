using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.DTO;
using BAK_Services.Models;

namespace BAK_Services.Services.Task
{
    public interface ITaskService
    {
        Task<Response<IEnumerable<Models.Entities.Task>>> GetAsync(IEnumerable<Guid> tasksIds = null);
        Task<Response<IEnumerable<Models.Entities.Task>>> GetByCourseIdAsync(Guid courseId);
        Response<Models.Entities.Task> AddAsync(TaskDto taskDto);
        Task<Response<Models.Entities.Task>> UpdateAsync(TaskDto taskDto);
        void DeleteAsync(Guid id);
    }
}
