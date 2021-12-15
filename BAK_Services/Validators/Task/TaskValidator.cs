using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace BAK_Services.Validators.Task
{
    public class TaskValidator : AbstractValidator<Models.Entities.Task>, ITaskValidator
    {
        public TaskValidator()
        {
            RuleFor(task => task.Name).NotNull();
            RuleFor(task => task.CourseId).NotNull();
        }
    }
}
