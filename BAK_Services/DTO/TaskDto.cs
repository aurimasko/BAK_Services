using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models;
using BAK_Services.Models.Entities;

namespace BAK_Services.DTO
{
    public class TaskDto : BaseDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid CourseId { get; set; }

        public int MinimumPointsCompletedToSuccess { get; set; }
        public int MaximumPointsToGet { get; set; }
    }
}
