using BAK_Services.Database;
using BAK_Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BAK_Services.Exceptions;
using BAK_Services.Models.Entities;

namespace BAK_Services.Repositories.Course
{
    public class CourseExecutionRepository : GenericRepository<CourseExecution>, ICourseExecutionRepository
    {
        public CourseExecutionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}