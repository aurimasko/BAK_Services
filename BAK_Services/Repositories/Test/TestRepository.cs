using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Database;

namespace BAK_Services.Repositories.Test
{
    public class TestRepository : GenericRepository<Models.Entities.Test>, ITestRepository
    {
        private readonly ApplicationDbContext _context;
        public TestRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
