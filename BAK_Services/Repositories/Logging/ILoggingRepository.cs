using BAK_Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Repositories.Logging
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Error>> GetLogs();
        Task<LogReport> Log(Error error);
    }
}