using BAK_Services.Models;
using BAK_Services.Repositories.Course;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BAK_Services.DTO;
using BAK_Services.Exceptions;
using BAK_Services.Validators;

namespace BAK_Services.Services.Course
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _repository;
        private readonly ICourseValidator _validator;
        private readonly IMapper _mapper;

        public CourseService(ICourseRepository repository, ICourseValidator validator, IMapper mapper)
        {
            _repository = repository;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<Response<IEnumerable<Models.Course>>> GetAsync(IEnumerable<Guid> CoursesId = null)
        {
            IEnumerable<Models.Course> result;

            if (CoursesId != null && !CoursesId.Any())
                result = await _repository.Find(c => CoursesId.Contains(c.Id));
            else
                result = await _repository.GetAll();

            return new Response<IEnumerable<Models.Course>>(result);
        }

        public Response<Models.Course> Add(CourseDto courseDto)
        {
            var course = _mapper.Map<Models.Course>(courseDto);

            var validationResult = _validator.Validate(course);

            if (!validationResult.IsValid)
                return new Response<Models.Course>(validationResult);

            _repository.Add(course);
            return new Response<Models.Course>(course);
        }

        public async Task<Response<Models.Course>> UpdateAsync(CourseDto courseDto)
        {
            var course = _mapper.Map<Models.Course>(courseDto);

            var validationResult = _validator.Validate(course);

            if (!validationResult.IsValid)
                return new Response<Models.Course>(validationResult);
            
            var updatableCourse = _repository.GetById(course.Id);
            _repository.ValidateConcurrencyToken(updatableCourse.Result, course.ConcurrencyToken);

            var updated = await _repository.UpdateAsync(updatableCourse.Result, course);
            return updated;
        }

        public async System.Threading.Tasks.Task DeleteAsync(Guid id)
        {
            var courseToBeDeleted = await _repository.GetById(id);

            if (courseToBeDeleted == null)
                throw new EntityNotFoundException(nameof(courseToBeDeleted));

            await _repository.Remove(courseToBeDeleted);
        }

    }
}