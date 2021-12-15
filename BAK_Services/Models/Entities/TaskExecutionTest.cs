using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Models.Entities
{
    public class TaskExecutionTest : BaseEntity
    {
        public TaskExecution TaskExecution { get; set; }
        public Guid TaskExecutionId { get; set; }

        public Test Test { get; set; }
        public Guid TestId { get; set; }

        public bool Completed { get; set; }
    }
}
