using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Database;
using BAK_Services.Models.Entities;
using BAK_Services.Repositories.Course;

namespace BAK_Services.Repositories.TaskExecutionTest
{
    public class TaskExecutionTestRepository : GenericRepository<Models.Entities.TaskExecutionTest>, ITaskExecutionTestRepository
    {
        public TaskExecutionTestRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
