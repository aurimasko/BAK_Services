using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.DTO.AutoMapper
{
    public static class AutoMapperInitializer
    {
        public static void Initialize()
        {
            var config = AutoMapperConfiguration.AddMappings();

            Mapper.MapperInstance = config.CreateMapper();
        }
    }
}
