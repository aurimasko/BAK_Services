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
            RuleFor(task => task.Name).Must(UniqueName).WithMessage("Task name must be unique.");

            RuleFor(task => task.CourseId).NotNull();
            RuleFor(task => task.CourseId).Must(CourseExists).WithMessage("Course must exists.");

        }

        private bool UniqueName(string taskName)
        {
            var result = _taskRepository.Find(c => c.Name.Equals(taskName));
            return !result.Result.Any();
        }

        private bool CourseExists(Guid courseId)
        {
            var result = _courseRepository.GetById(courseId);
            return result.Result != null;
        }
    }
}
