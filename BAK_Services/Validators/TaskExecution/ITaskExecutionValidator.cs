using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace BAK_Services.Validators.TaskExecution
{
    public interface ITaskExecutionValidator : IValidator<Models.Entities.TaskExecution>
    {
    }
}
