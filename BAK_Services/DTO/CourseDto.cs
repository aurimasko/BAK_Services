using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models.Entities;
using BAK_Services.Models.Enums;

namespace BAK_Services.DTO
{
    public class CourseDto : BaseDto
    {
        public string Name { get; set; }
        public CourseLevel Level { get; set; }
        public int MinimumTasksCompletedToSuccess { get; set; }
    }
}
