using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Models
{
    public abstract class BaseEntity
    {
        protected BaseEntity()
        {
            CreationDate = DateTime.UtcNow;
        }

        [Key]
        public Guid Id { get; set; }

        [Required]
        [Display(Name = "CreationDate")]
        public DateTime CreationDate { get; set; }

        public DateTime Modified { get; set; }


        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }
    }
}
