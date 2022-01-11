using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Repositories.Task;
using BAK_Services.Repositories.Test;
using FluentValidation;

namespace BAK_Services.Validators.Test
{
    public class TestValidator : AbstractValidator<Models.Entities.Test>, ITestValidator
    {
        private readonly ITaskRepository _taskRepository;

        public TestValidator(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;

            RuleFor(test => test.TaskId).NotNull();
            RuleFor(test => test.TestCode).NotEmpty();
            RuleFor(test => test.TaskId).Must(TaskExists).WithMessage("Task with this task id must exists.");
        }

        private bool TaskExists(Guid taskId)
        {
            var result = _taskRepository.GetById(taskId);

            return result.Result != null;
        }
    }
}
