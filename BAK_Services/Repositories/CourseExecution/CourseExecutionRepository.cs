using BAK_Services.Database;
using BAK_Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BAK_Services.Exceptions;
using BAK_Services.Models.Entities;

namespace BAK_Services.Repositories.Course
{
    public class CourseExecutionRepository : GenericRepository<CourseExecution>, ICourseExecutionRepository
    {
        private readonly ApplicationDbContext _context;
        public CourseExecutionRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<CourseExecution> Evaluate(Guid courseExecutionId, bool isCourseSuccessful)
        {
            var courseExecution = await _context.CourseExecutions.FindAsync(courseExecutionId);

            courseExecution.Successful = isCourseSuccessful;
            await _context.SaveChangesAsync();

            return courseExecution;
        }

        public async Task<CourseExecution> GetByIdWithTaskExecutions(Guid id)
        {
            return await _context.CourseExecutions.Include(x => x.Course).Include(x=>x.User).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<IEnumerable<CourseExecution>> GetAllWithCourseIncluded()
        {
            return await _context.CourseExecutions.Include(x => x.Course).Include(x => x.User).ToListAsync();
        }
        public async Task<IEnumerable<CourseExecution>> GetByUserIdWithCourseAsync(Guid userId)
        {
            return await _context.CourseExecutions.Where(x => x.UserId == userId.ToString()).Include(x => x.Course).ToListAsync();
        }
    }
}