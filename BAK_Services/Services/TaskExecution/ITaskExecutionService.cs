using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.DTO;
using BAK_Services.Models;
using Microsoft.AspNetCore.Http;

namespace BAK_Services.Services.TaskExecution
{
    public interface ITaskExecutionService
    {
        Task<Response<IEnumerable<Models.Entities.TaskExecution>>> GetAsync(IEnumerable<Guid> taskExecutionsIds = null);
        Task<Response<IEnumerable<Models.Entities.TaskExecution>>> GetByTaskIdAsync(Guid taskId);
        Response<Models.Entities.TaskExecution> AddAsync(TaskExecutionDto taskExecutionDto);
        //Task<Response<Models.Entities.TaskExecution>> UpdateAsync(Models.Entities.TaskExecution taskExecution);
        void DeleteAsync(Guid id);

        Task<bool> Evaluate(Models.Entities.TaskExecution taskExecution);

        Task<Response<IEnumerable<Models.Entities.TaskExecution>>> GetByCourseExecutionIdAsync(Guid courseExecutionId);

    }
}
