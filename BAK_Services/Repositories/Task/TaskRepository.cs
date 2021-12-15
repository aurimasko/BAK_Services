using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BAK_Services.Database;
using BAK_Services.Models;
using Microsoft.EntityFrameworkCore;

namespace BAK_Services.Repositories.Task
{
    public class TaskRepository : GenericRepository<Models.Entities.Task>, ITaskRepository
    {
        private readonly ApplicationDbContext _context;
        public TaskRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Response<Models.Entities.Task>> UpdateAsync(Models.Entities.Task updatableTask, Models.Entities.Task newTask)
        {
            updatableTask.Name = newTask.Name;
            updatableTask.Description = newTask.Description;

            await _context.SaveChangesAsync();
            return new Response<Models.Entities.Task>(updatableTask);
        }
    }
}
