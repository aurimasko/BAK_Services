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
        public IFormFile ExecutionFileEntry { get; set; }
        public Guid TaskId { get; set; }

        //public ICollection<Test> Tests { get; set; }
    }
}
