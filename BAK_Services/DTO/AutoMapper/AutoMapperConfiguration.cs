using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.DTO.AutoMapper.Profiles;

namespace BAK_Services.DTO.AutoMapper
{
    public class AutoMapperConfiguration
    {
        public static MapperConfiguration AddMappings()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<TaskExecutionProfile>();
                cfg.AddProfile<CourseProfile>();
                cfg.AddProfile<UserProfile>();
                cfg.AddProfile<TaskProfile>();
                //----
            });

            return config;
        }
    }
}
