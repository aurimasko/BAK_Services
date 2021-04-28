using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Models
{
    /// <summary>
    /// Result of a localization
    /// </summary>
    public class LocalizationResult
    {
        public string Key { get; set; }
        public string Value { get; set; }

        /// <summary>
        /// Automatic conversion to string
        /// </summary>
        public static implicit operator string(LocalizationResult res)
        {
            return res.Value;
        }
    }
}