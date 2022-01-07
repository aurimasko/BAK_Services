using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Repositories.Test
{
    public interface ITestRepository : IGenericRepository<Models.Entities.Test>
    {
        System.Threading.Tasks.Task Remove(Models.Entities.Test entity);
    }
}
