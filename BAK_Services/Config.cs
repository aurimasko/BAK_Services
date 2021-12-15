using BAK_Services.Services.Localization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services
{
    public static class Config
    {
        public const string DatabaseConnectionString = "Server=tcp:localhost,1433;User ID=sa;Password=Laser1140?;database=BAK;Trusted_Connection=False;Encrypt=True;TrustServerCertificate=True;MultipleActiveResultSets=True;";

        public static ILocalizationService LocalizationService { get; set; }

    }
}