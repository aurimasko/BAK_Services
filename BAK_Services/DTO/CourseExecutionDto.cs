using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models;
using BAK_Services.Models.Entities;

namespace BAK_Services.DTO
{
    public class CourseExecutionDto : BaseDto
    {
        public UserDto User { get; set; }
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
        public Course Course { get; set; }

        public bool? Successful { get; set; }
        public ICollection<TaskExecution> TaskExecutions { get; set; }

    }
}
