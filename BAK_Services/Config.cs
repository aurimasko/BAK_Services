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
        public const string DatabaseConnectionString = "server=localhost; port=3306; database=BAK; user=root; password=Laser1140?;";

        public static ILocalizationService LocalizationService { get; set; }

    }
}