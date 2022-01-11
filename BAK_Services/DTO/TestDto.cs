using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Models.Entities;

namespace BAK_Services.DTO
{
    public class TestDto : BaseDto
    {
        public Guid TaskId { get; set; }

        public string TestCode { get; set; }

    }
}
