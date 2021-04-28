using Microsoft.AspNetCore.Http;
using BAK_Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Services.Logging
{
    public interface ILoggingService
    {
        Task<IEnumerable<Error>> GetLogs();
        Task<LogReport> Log(Error error);
    }
}