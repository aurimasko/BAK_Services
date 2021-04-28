﻿using BAK_Services.Models;
using BAK_Services.Repositories.Logging;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Services.Logging
{
    public class LoggingService : ILoggingService
    {
        private readonly ILoggingRepository _repository;

        public LoggingService(ILoggingRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Error>> GetLogs()
        {
            return _repository.GetLogs();
        }

        public Task<LogReport> Log(Error error)
        {
            return _repository.Log(error);
        }
    }
}