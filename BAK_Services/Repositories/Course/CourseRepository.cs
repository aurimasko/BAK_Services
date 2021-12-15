using BAK_Services.Database;
using BAK_Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public void Addz(Models.Course entity)
        {
            var created = _context.Courses.AddAsync(entity);
            _context.SaveChanges();
        }


        public async Task<Response<Models.Course>> UpdateAsync(Models.Course updatableCourse, Models.Course newCourse)
        {
            updatableCourse.Name = newCourse.Name;
            updatableCourse.Level = newCourse.Level;

            await _context.SaveChangesAsync();
            return new Response<Models.Course>(updatableCourse);
        }
    }
}