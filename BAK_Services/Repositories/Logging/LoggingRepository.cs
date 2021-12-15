using BAK_Services.Database;
using BAK_Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Repositories.Logging
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDbContext _context;
        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Error>> GetLogs()
        {
            return await _context.Errors.ToListAsync().ConfigureAwait(false);
        }

        public async Task<LogReport> Log(Error error)
        {
            var added = await _context.Errors.AddAsync(error).ConfigureAwait(false);
            if (added.Entity == null)
                return null;

            if (await _context.SaveChangesAsync().ConfigureAwait(false) > 0)
                return new LogReport(added.Entity);


            return null;
        }
    }
}