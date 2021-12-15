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
        public byte[] ExecutionFile { get; set; }
        
        public Task Task { get; set; }
        public Guid TaskId { get; set; }

        public ICollection<Test> Tests { get; set; }
    }
}
