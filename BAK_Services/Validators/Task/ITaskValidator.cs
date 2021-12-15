using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace BAK_Services.Validators.Task
{
    public interface ITaskValidator : IValidator<Models.Entities.Task>
    {
    }
}
