using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BAK_Services.Models;

namespace BAK_Services.Repositories.Task
{
    public interface ITaskRepository : IGenericRepository<Models.Entities.Task>
    {
        Task<Response<Models.Entities.Task>> UpdateAsync(Models.Entities.Task updatableTask, Models.Entities.Task newTask);
    }
}
