using System.Collections.Generic;
using BAK_Services;
using BAK_Services.Database;
using BAK_Services.DTO.AutoMapper;
using BAK_Services.Exceptions;
using BAK_Services.Models;
using BAK_Services.Repositories.Course;
using BAK_Services.Repositories.Task;
using BAK_Services.Repositories.TaskExecution;
using BAK_Services.Repositories.TaskExecutionTest;
using BAK_Services.Repositories.Test;
using BAK_Services.Services.Course;
using BAK_Services.Services.CourseExecution;
using BAK_Services.Services.Task;
using BAK_Services.Services.TaskExecution;
using BAK_Services.Services.Test;
using BAK_Services.Validators;
using BAK_Services.Validators.Task;
using BAK_Services.Validators.TaskExecution;
using BAK_Services.Validators.Test;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace bak_web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //   services.AddAutoMapper(typeof(Startup));
            AutoMapperInitializer.Initialize();
            
            services.AddSingleton(Mapper.MapperInstance);

            services.AddControllers(x => x.AllowEmptyInputInBodyModelBinding = true).AddFluentValidation()
                .AddNewtonsoftJson(options =>
                {
                    //Ignore reference looping
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    //serialize enums as strings not integers
                    options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
                });

            services.Configure<ApiBehaviorOptions>(options =>
            {
                //Return custom model state validation results
                options.InvalidModelStateResponseFactory = (context) =>
                {
                    var modelState = context.ModelState;

                    var listOfErrorMessages = new List<string>();

                    foreach (var keyModelStatePair in modelState)
                    {
                        var key = keyModelStatePair.Key;
                        var errors = keyModelStatePair.Value.Errors;
                        if (errors != null && errors.Count > 0)
                        {
                            foreach (var error in errors)
                            {
                                if (!string.IsNullOrEmpty(error.ErrorMessage))
                                    listOfErrorMessages.Add(error.ErrorMessage);
                            }
                        }
                    }

                    var response = new Response(listOfErrorMessages, new List<ErrorCodesEnum>() { ErrorCodesEnum.ValidationErrors });
                    return new BadRequestObjectResult(response);
                };
            });

            //Add database connection
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Config.DatabaseConnectionString));


            //Add in memory cache
            services.AddMemoryCache();

            //Register repositories
            services.AddScoped<ICourseExecutionRepository, CourseExecutionRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<ITaskRepository, TaskRepository>();
            services.AddScoped<ITaskExecutionRepository, TaskExecutionRepository>();
            services.AddScoped<ITestRepository, TestRepository>();
            services.AddScoped<ITaskExecutionTestRepository, TaskExecutionTestRepository>();

            //Register services
            services.AddScoped<ICourseExecutionService, CourseExecutionService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<ITaskExecutionService, TaskExecutionService>();
            services.AddScoped<ITestService, TestService>();

            services.AddScoped<ICourseValidator, CourseValidator>();
            services.AddScoped<ITaskValidator, TaskValidator>();
            services.AddScoped<ITestValidator, TestValidator>();
            services.AddScoped<ITaskExecutionValidator, TaskExecutionValidator>();

            //Register factories for custom error validation
            /* services.AddTransient<IClientErrorFactory, CustomClientErrorFactory>((provider) =>
             {
                 using (var scope = provider.CreateScope())
                 {
                     var loggingService = scope.ServiceProvider.GetService<ILo>();
                     var service = new CustomClientErrorFactory(loggingService);
                     return service;
                 }
             });*/


            //Add http context accessor
            services.AddHttpContextAccessor();

            //Add JWT token validation for authentication
            /* services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                 .AddJwtBearer(options =>
                 {
                     options.Authority = Config.IdentityServerUrl;
                     options.Audience = Config.IdentityServerApiName;
                 }
                 );*/

            //Add Cors for all request
            //IN PRODUCTION REPLACE WITH HOSTED ADDRESS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllRequests", builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        //.AllowCredentials()
                        .AllowAnyHeader();
                });
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "WebApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext dbContext)
        {
            
            
            // Configure Cors
            app.UseCors("AllowAllRequests");

            // Add request localization
            app.UseRequestLocalization();
            
            //Add global exception handler
            app.ConfigureExceptionHandler();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "WebApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            //Applies any pending migrations and seeds initial data
            dbContext.Migrate();
        }
    }
}
