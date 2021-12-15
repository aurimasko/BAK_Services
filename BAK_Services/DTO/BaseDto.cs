using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Models.Entities
{
    public class BaseDto
    {
        public Guid? Id { get; set; }
        public byte[] ConcurrencyToken { get; set; }
        //public DateTime Modified { get; set; }
    }
}
