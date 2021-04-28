using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using BAK_Services.Models;
using BAK_Services.Services.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace BAK_Services.Exceptions
{
    public static class GlobalExceptionHandler
    {
        /// <summary>
        /// Global exception handler to handle exceptions
        /// </summary>
        /// <param name="app">Application builder reference</param>
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        try
                        {
                            using (var scope = app.ApplicationServices.CreateScope())
                            {
                                //Log exception
                                var logService = scope.ServiceProvider.GetService<ILoggingService>();
                                if (logService != null)
                                {
                                    var logReport = await logService.Log(new Error(contextFeature.Error, context.Request));
                                    await context.Response.WriteAsync(new Response("An internal error occured, please contact support with error id '" + logReport.IssueId + "'", ErrorCodesEnum.Exception).ToString());
                                }
                                else
                                {
                                    await context.Response.WriteAsync(new Response("An internal error occured", ErrorCodesEnum.Exception).ToString());
                                }
                            }
                        }
                        catch (Exception)
                        {
                            await context.Response.WriteAsync(new Response("An internal error occured", ErrorCodesEnum.Exception).ToString());
                        }
                    }

                });
            });
        }
    }
}