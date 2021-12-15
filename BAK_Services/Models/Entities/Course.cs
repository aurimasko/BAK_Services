using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Models
{
    public class Course : BaseEntity
    {
        public string Name { get; set; }
        public int Level { get; set; }
    }
}
