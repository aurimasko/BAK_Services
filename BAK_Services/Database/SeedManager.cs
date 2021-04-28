using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using BAK_Services.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Database
{
    public static class SeedManager
    {
        /// <summary>
        /// Extension method to apply pending migration and seed data if needed
        /// </summary>
        /// <param name="context">Database context for which apply migrations and seed data</param>
        public static void Migrate(this ApplicationDbContext context)
        {
            context.Database.Migrate();
        }
    }
}