using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models;

namespace BAK_Services.Services.Test
{
    public interface ITestService
    {
        Task<Response<IEnumerable<Models.Entities.Test>>> GetAsync(IEnumerable<Guid> testsIds = null);
        Task<Response<IEnumerable<Models.Entities.Test>>> GetByTaskIdAsync(Guid taskId);

        Response<Models.Entities.Test> AddAsync(Models.Entities.Test test);
        //Task<Response<Models.Entities.Test>> UpdateAsync(Models.Entities.Test test);
        void DeleteAsync(Guid id);
    }
}
