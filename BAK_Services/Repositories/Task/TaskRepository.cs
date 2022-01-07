using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BAK_Services.Database;
using BAK_Services.Exceptions;
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
            updatableTask.CourseId = newTask.CourseId;

            await _context.SaveChangesAsync();
            return new Response<Models.Entities.Task>(updatableTask);
        }

        public async System.Threading.Tasks.Task Remove(Models.Entities.Task entity)
        {
            var deleted = _context.Tasks.Remove(entity);

            if (deleted.Entity == null)
                throw new EntityNotFoundException(nameof(deleted));

            await _context.SaveChangesAsync();
        }
    }
}
