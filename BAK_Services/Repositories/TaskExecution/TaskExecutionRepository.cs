using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Database;

namespace BAK_Services.Repositories.TaskExecution
{
    public class TaskExecutionRepository : GenericRepository<Models.Entities.TaskExecution>, ITaskExecutionRepository
    {
        private readonly ApplicationDbContext _context;
        public TaskExecutionRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
