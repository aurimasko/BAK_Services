using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Repositories.Task;
using FluentValidation;

namespace BAK_Services.Validators.TaskExecution
{
    public class TaskExecutionValidator : AbstractValidator<Models.Entities.TaskExecution>, ITaskExecutionValidator
    {
        private readonly ITaskRepository _taskRepository;
        public TaskExecutionValidator(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;

            RuleFor(taskExecution => taskExecution.ExecutionFile).NotNull();
            RuleFor(task => task.TaskId).Must(TaskExists).WithMessage("Task with this task id must exists.");
        }

        private bool TaskExists(Guid taskId)
        {
            var result = _taskRepository.GetById(taskId);
            return result.Result != null;
        }
    }
}
