using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Models.Entities
{
    public class Task : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public Course Course { get; set; }
        public Guid CourseId { get; set; }

        public ICollection<Test> Tests { get; set; }
    }
}
