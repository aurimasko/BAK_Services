using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Models.Entities
{
    public class Test : BaseEntity
    {
        public Task Task { get; set; }
        public Guid TaskId { get; set; }

        public string TestCode { get; set; }

        public ICollection<TaskExecutionTest> TaskExecutionsTests { get; set; } = new List<TaskExecutionTest>();
    }
}
