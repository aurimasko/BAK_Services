using BAK_Services.Database;
using BAK_Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BAK_Services.Exceptions;

namespace BAK_Services.Repositories.Course
{
    public class CourseRepository : GenericRepository<Models.Course>, ICourseRepository
    {
        private readonly ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }


        public async Task<Response<Models.Course>> UpdateAsync(Models.Course updatableCourse, Models.Course newCourse)
        {
            updatableCourse.Name = newCourse.Name;
            updatableCourse.Level = newCourse.Level;
            updatableCourse.MinimumTasksCompletedToSuccess = newCourse.MinimumTasksCompletedToSuccess;
            updatableCourse.Description = newCourse.Description;

            await _context.SaveChangesAsync();
            return new Response<Models.Course>(updatableCourse);
        }

        public async System.Threading.Tasks.Task Remove(Models.Course entity)
        {
            var deleted = _context.Courses.Remove(entity);

            if (deleted.Entity == null)
                throw new EntityNotFoundException(nameof(deleted));
            await _context.SaveChangesAsync();
        }
    }
}