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

        public async Task<IEnumerable<CourseExecution>> GetByUserIdWithCourseAsync(Guid userId)
        {
            return await _context.CourseExecutions.Where(x => x.UserId == userId).Include(x => x.Course).ToListAsync();
        }
    }
}