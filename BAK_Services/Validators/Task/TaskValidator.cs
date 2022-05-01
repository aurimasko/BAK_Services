using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Repositories.Course;
using BAK_Services.Repositories.Task;
using FluentValidation;

namespace BAK_Services.Validators.Task
{
    public class TaskValidator : AbstractValidator<Models.Entities.Task>, ITaskValidator
    {
        private readonly ITaskRepository _taskRepository;
        private readonly ICourseRepository _courseRepository;

        public TaskValidator(ITaskRepository taskRepository, ICourseRepository courseRepository)
        {
            _taskRepository = taskRepository;
            _courseRepository = courseRepository;

            RuleFor(task => task.Name).NotNull();

            RuleFor(task => task.CourseId).NotNull();
            RuleFor(task => task.CourseId).Must(CourseExists).WithMessage("Kursas privalo egzistuoti.");

            RuleFor(task => task.MinimumPointsCompletedToSuccess).GreaterThanOrEqualTo(0)
                .WithMessage("Minimalus taškų skaičius turi būti 0 arba daugiau.");

            RuleFor(task => task.MaximumPointsToGet).GreaterThanOrEqualTo(1)
                .WithMessage("Maksimalus taškų skaičius turi būti 1 arba daugiau.");

            RuleFor(task => task.MinimumPointsCompletedToSuccess).LessThanOrEqualTo(x => x.MaximumPointsToGet)
                .WithMessage("Minimalus taškų skaičius negali būti didesnis už maksimalų!");
        }

        private bool CourseExists(Guid courseId)
        {
            var result = _courseRepository.GetById(courseId);
            return result.Result != null;
        }
    }
}
