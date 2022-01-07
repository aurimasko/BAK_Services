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
using Microsoft.EntityFrameworkCore;

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
                                var response = new Response("An internal error occured, please contact support",
                                    ErrorCodesEnum.Exception);

                                if (contextFeature.Error.GetType() == typeof(EntityNotFoundException))
                                    response = new Response(ErrorCodesEnum.NotFound, contextFeature.Error.Message);

                                if (contextFeature.Error.GetType() == typeof(DbUpdateConcurrencyException))
                                    response = new Response(ErrorCodesEnum.ConcurrencyException,
                                        contextFeature.Error.Message);

                                await context.Response.WriteAsync(response.ToString());
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