using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace BAK_Services.Validators.Test
{
    public class CourseValidator : AbstractValidator<Models.Course>, ICourseValidator
    {
        public CourseValidator()
        {
            RuleFor(course => course.Name).NotNull();
            RuleFor(course => course.Level).GreaterThan(0);
        }
    }
}
