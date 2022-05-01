using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Authentication;

namespace BAK_Services.Models.Entities
{
    public class CourseExecution : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
        public bool? Successful { get; set; }
        public ICollection<TaskExecution> TaskExecutions { get; set; }

    }
}
