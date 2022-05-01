using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Authentication
{
    public enum Role
    {
        Student,
        Teacher,
        Admin
    }

    public static class RoleHelper
    {
        public static Role GetRoleFromRoleName(string roleName)
        {
            return (Role) Enum.Parse(typeof(Role), roleName);
        }
    }
}
