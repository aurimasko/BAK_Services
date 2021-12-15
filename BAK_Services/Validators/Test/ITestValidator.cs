using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models;
using FluentValidation;

namespace BAK_Services.Validators.Test
{
    public interface ITestValidator : IValidator<Models.Entities.Test>
    {
    }
}
