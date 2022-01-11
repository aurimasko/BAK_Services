using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BAK_Services.Models.Entities;

namespace BAK_Services.DTO.AutoMapper.Profiles
{
  
    public class TestProfile : Profile
    {
        public TestProfile()
        {
            CreateMap<TestDto, Test>();
            CreateMap<Test, TestDto>();
        }
    }
}
