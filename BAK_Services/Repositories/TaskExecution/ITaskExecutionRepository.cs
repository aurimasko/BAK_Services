using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Repositories.TaskExecution
{
    public interface ITaskExecutionRepository : IGenericRepository<Models.Entities.TaskExecution>
    {
        Task<IEnumerable<Models.Entities.TaskExecution>> GetByCourseExecutionIdAsync(Guid courseExecutionId);

        Task<Models.Entities.TaskExecution>
            AddTaskExecutionEvaluation(Guid taskExecutionId, int mark, bool isSuccessful);
    }
}
