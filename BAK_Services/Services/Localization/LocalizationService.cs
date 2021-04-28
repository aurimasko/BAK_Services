using BAK_Services.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Threading.Tasks;

namespace BAK_Services.Services.Localization
{
    /// <summary>
    /// Localization service used to localize strings
    /// </summary>
    public class LocalizationService : ILocalizationService
    {
        private const string ResourceId = "PSK_Service.Resources.Translations";
        private readonly Lazy<ResourceManager> ResMgr = new Lazy<ResourceManager>(() => new ResourceManager(ResourceId, IntrospectionExtensions.GetTypeInfo(typeof(LocalizationService)).Assembly));

        public CultureInfo GetLocale()
        {
            return CultureInfo.CurrentCulture;
        }

        public LocalizationResult Localize(string key, params string[] parameters)
        {
            try
            {
                string result = ResMgr.Value.GetString(key, GetLocale());
                if (String.IsNullOrEmpty(result))
                {
                    //Fallback to english
                    var resultFallback = ResMgr.Value.GetString(key, CultureInfo.GetCultureInfo("en-US"));

                    //Fallback to key, if even english doesn't exist
                    if (String.IsNullOrEmpty(resultFallback))
                        result = key;
                    else
                        result = resultFallback;
                }


                //Try to insert parameters if there are any
                if (!String.IsNullOrEmpty(result))
                    if (parameters != null && parameters.Length != 0)
                        for (int i = 0; i < parameters.Count(); i++)
                            result = result.Replace("{" + i + "}", parameters[i]);

                return new LocalizationResult()
                {
                    Key = key,
                    Value = result
                };
            }
            //if exception occurs, don't fail, return key
            catch
            {
                return new LocalizationResult()
                {
                    Key = key,
                    Value = key
                };
            }
        }
    }
}