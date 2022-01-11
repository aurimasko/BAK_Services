using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models.Enums;

namespace BAK_Services.Models
{
    public class Course : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public CourseLevel Level { get; set; }
        public int MinimumTasksCompletedToSuccess { get; set; }

    }
}
