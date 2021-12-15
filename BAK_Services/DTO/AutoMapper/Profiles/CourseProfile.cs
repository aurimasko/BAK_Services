using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BAK_Services.Models.Entities;

namespace BAK_Services.DTO.AutoMapper.Profiles
{
    public class CourseProfile : Profile
    {
        public CourseProfile()
        {
            CreateMap<CourseDto, Models.Course>();
            CreateMap<Models.Course, CourseDto>();
        }
    }
}
