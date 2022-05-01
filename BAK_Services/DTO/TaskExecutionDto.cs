using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models.Entities;
using Microsoft.AspNetCore.Http;

namespace BAK_Services.DTO
{
    public class TaskExecutionDto : BaseDto
    {
        public string ExecutionCode { get; set; }
        public string ExecutionWorkspace { get; set; }

        public Guid TaskId { get; set; }

        public bool Successful { get; set; }


        //public ICollection<Test> Tests { get; set; }
    }
}
