using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using BAK_Services.Services.Localization;
using BAK_Services.Models;
using BAK_Services.Factories;
using BAK_Services.Services.Logging;
using BAK_Services.Database;
using BAK_Services.Helpers;
using Microsoft.EntityFrameworkCore;
using BAK_Services.Exceptions;

namespace BAK_Services
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
            services.AddControllers()
            //Add newtonsoft as json serializer
            /*.AddNewtonsoftJson(options =>
            {
                //Ignore reference looping
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                //serialize enums as strings not integers
                options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
            })*/;

            //Add request localization options
            services.Configure<RequestLocalizationOptions>(options =>
            {
                var supportedCultures = new[]
                {
                    new CultureInfo("en"),
                    new CultureInfo("lt")
                };

                options.DefaultRequestCulture = new RequestCulture("en");
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
                options.RequestCultureProviders.Insert(0, new CustomRequestCultureProvider(context =>
                {
                    var userLangs = context.Request.Headers["Accept-Language"].ToString();
                    var firstLang = userLangs.Split(',').FirstOrDefault();
                    var defaultLang = string.IsNullOrEmpty(firstLang) ? "en" : firstLang;
                    return Task.FromResult(new ProviderCultureResult(defaultLang, defaultLang));
                }));
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
                                if (!String.IsNullOrEmpty(error.ErrorMessage))
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
            {
                string connectionString = Config.DatabaseConnectionString;
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            }
            );

            //Add swagger services
            //Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "API"
                });

                //Use full name of the class to avoid conflicts
                c.CustomSchemaIds(i => i.FullName);

                //Add bearer token authorization
                /*c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });*/
           });

            //Add in memory cache
            services.AddMemoryCache();

            //Register repositories
            //services.AddScoped<IUserRepository, UserRepository>();

            //Register services
            //services.AddScoped<IUserService, UserService>();


            //Register factories for custom error validation
            services.AddTransient<IClientErrorFactory, CustomClientErrorFactory>((provider) =>
            {
                using (var scope = provider.CreateScope())
                {
                    var loggingService = scope.ServiceProvider.GetService<ILoggingService>();
                    var service = new CustomClientErrorFactory(loggingService);
                    return service;
                }
            });

            //Register default localization service
            Config.LocalizationService = new LocalizationService();

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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Configure Cors
            app.UseCors("AllowAllRequests");

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Add request localization
            app.UseRequestLocalization();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API");
                c.RoutePrefix = string.Empty;
            });

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

            //Applies any pending migrations and seeds initial data
            dbContext.Migrate();
        }
    }
}
