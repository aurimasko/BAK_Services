using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using BAK_Services.Models;
using BAK_Services.Services.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Factories
{
    /// <summary>
    /// Custom client error factory to replace the ProblemDetails return object
    /// </summary>
    public class CustomClientErrorFactory : IClientErrorFactory
    {
        private ILoggingService _loggerService;
        public CustomClientErrorFactory(ILoggingService loggerService)
        {
            _loggerService = loggerService;
        }

        public IActionResult GetClientError(ActionContext actionContext, IClientErrorActionResult clientError)
        {
            //Try logging error
            try
            {
                //Log error
                var logReport = _loggerService.Log(new Error(clientError.StatusCode?.ToString() ?? "500", actionContext.HttpContext.Request)).Result;
                return new ObjectResult(new Response("An internal error occured, please contact support with error id '" + logReport.IssueId + "'", ErrorCodesEnum.Exception))
                {
                    StatusCode = clientError.StatusCode ?? 500
                };
            }
            catch { }

            return new ObjectResult(new Response("An internal error occured.", ErrorCodesEnum.Exception))
            {
                StatusCode = clientError.StatusCode ?? 500
            };
        }
    }
}