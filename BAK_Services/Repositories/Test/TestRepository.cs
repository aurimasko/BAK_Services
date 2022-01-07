using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Database;
using BAK_Services.Exceptions;

namespace BAK_Services.Repositories.Test
{
    public class TestRepository : GenericRepository<Models.Entities.Test>, ITestRepository
    {
        private readonly ApplicationDbContext _context;
        public TestRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public async System.Threading.Tasks.Task Remove(Models.Entities.Test entity)
        {
            var deleted = _context.Tests.Remove(entity);

            if (deleted.Entity == null)
                throw new EntityNotFoundException(nameof(deleted));

            await _context.SaveChangesAsync();
        }
    }
}
