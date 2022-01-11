using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Database;
using BAK_Services.Models.Enums;
using BAK_Services.Repositories.Course;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BAK_Services.Validators.Test
{
    public class CourseValidator : AbstractValidator<Models.Course>, ICourseValidator
    {
        private readonly ICourseRepository _courseRepository;

        public CourseValidator(DbContextOptions<ApplicationDbContext> options)
        {
            _courseRepository = new CourseRepository(new ApplicationDbContext(options));

            RuleFor(course => course.Name).NotEmpty();
            RuleFor(course => course.Description).NotEmpty();
            RuleFor(course => course.Name).MustAsync(async (entity, value, c) => await UniqueName(entity, value)).WithMessage("Course name must be unique.");
            RuleFor(course => course.Level).IsInEnum();
        }

        private async Task<bool> UniqueName(Models.Course course, string courseName)
        {
            var result = await _courseRepository.Find(c => c.Name.Equals(courseName) && c.Id != course.Id);
            return !result.Any();
        }
    }
}
