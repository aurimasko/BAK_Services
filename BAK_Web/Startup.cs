using System.Collections.Generic;
using System.Text;
using BAK_Services;
using BAK_Services.Authentication;
using BAK_Services.Database;
using BAK_Services.DTO.AutoMapper;
using BAK_Services.Exceptions;
using BAK_Services.Factories;
using BAK_Services.Models;
using BAK_Services.Repositories.Course;
using BAK_Services.Repositories.Task;
using BAK_Services.Repositories.TaskExecution;
using BAK_Services.Services.Course;
using BAK_Services.Services.CourseExecution;
using BAK_Services.Services.Task;
using BAK_Services.Services.TaskExecution;
using BAK_Services.Validators;
using BAK_Services.Validators.Task;
using BAK_Services.Validators.TaskExecution;
using BAK_Services.Validators.Test;
using FluentValidation.AspNetCore;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
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
                options.UseSqlServer(Configuration.GetConnectionString("RootDb")));


            //Add in memory cache
            services.AddMemoryCache();

            //Register repositories
            services.AddScoped<ICourseExecutionRepository, CourseExecutionRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<ITaskRepository, TaskRepository>();
            services.AddScoped<ITaskExecutionRepository, TaskExecutionRepository>();

            //Register services
            services.AddScoped<ICourseExecutionService, CourseExecutionService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<ITaskExecutionService, TaskExecutionService>();

            services.AddScoped<ICourseValidator, CourseValidator>();
            services.AddScoped<ITaskValidator, TaskValidator>();
            services.AddScoped<ITaskExecutionValidator, TaskExecutionValidator>();

            //Add http context accessor
            services.AddHttpContextAccessor();


            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            
            // Adding Authentication  
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = false,
                        ValidateAudience = true,
                        ValidAudience = "http://localhost:4200",
                        ValidIssuer = "http://localhost:61955", //todo: put to config
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ByYM000OLlMQG6VVVp1OH7Xzyr7gHuw1qvUC5dcGt3SNM"))
                    };
                });

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
                configuration.RootPath = "WebApp/dist/WebApp";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext dbContext)
        {
            app.UseMiddleware<JwtMiddleware>();

            // Configure Cors
            app.UseCors("AllowAllRequests");

            //Add global exception handler
            app.ConfigureExceptionHandler();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
       
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

        }
    }
}
