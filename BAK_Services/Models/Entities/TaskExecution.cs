using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BAK_Services.Models.Entities
{
    public class TaskExecution : BaseEntity
    {
        public string ExecutionCode { get; set; }

        public CourseExecution CourseExecution { get; set; }
        public Guid CourseExecutionId { get; set; }

        public Task Task { get; set; }
        public Guid TaskId { get; set; }

        public int? Mark { get; set; }
        public bool? Successful { get; set; }
    }
}
