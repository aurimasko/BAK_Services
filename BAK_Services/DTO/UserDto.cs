using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Authentication;
using BAK_Services.Models.Entities;

namespace BAK_Services.DTO
{
    public class UserDto 
    {
        public  string Id { get; set; }
        public string UserName { get; set; }
    }
}
