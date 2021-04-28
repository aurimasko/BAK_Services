using BAK_Services.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Services.Localization
{
    /// <summary>
    /// Used to localize strings
    /// </summary>
    public interface ILocalizationService
    {
        /// <summary>
        /// Gets locale which is used for localization
        /// </summary>
        /// <returns>CultureInfo instance</returns>
        CultureInfo GetLocale();

        /// <summary>
        /// Localizes a key
        /// </summary>
        /// <param name="key">Key by which the value should be found in dictionary</param>
        /// <param name="parameters"></param>
        /// <returns>LocalizationResult instance containin information about the result</returns>
        LocalizationResult Localize(string key, params string[] parameters);
    }
}