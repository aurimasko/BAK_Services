using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models.Enums;
using BAK_Services.Repositories.Course;
using FluentValidation;

namespace BAK_Services.Validators.Test
{
    public class CourseValidator : AbstractValidator<Models.Course>, ICourseValidator
    {
        private readonly ICourseRepository _courseRepository;

        public CourseValidator(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;

            RuleFor(course => course.Name).NotNull();
            RuleFor(course => course.Name).Must(UniqueName).WithMessage("Course name must be unique.");
            RuleFor(course => course.Level).IsInEnum();
        }

        private bool UniqueName(string courseName)
        {
            var result = _courseRepository.Find(c => c.Name.Equals(courseName));
            return !result.Result.Any();
        }
    }
}
