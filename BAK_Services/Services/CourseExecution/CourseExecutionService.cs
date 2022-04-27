using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BAK_Services.DTO;
using BAK_Services.Exceptions;
using BAK_Services.Models;
using BAK_Services.Models.Entities;
using BAK_Services.Repositories.Course;
using BAK_Services.Repositories.Task;
using BAK_Services.Repositories.TaskExecution;
using BAK_Services.Repositories.TaskExecutionTest;
using BAK_Services.Repositories.Test;
using BAK_Services.Services.Task;
using BAK_Services.Services.TaskExecution;
using BAK_Services.Validators;
using RazorLight.Extensions;

namespace BAK_Services.Services.CourseExecution
{
    public class CourseExecutionService : ICourseExecutionService
    {
        private readonly ICourseExecutionRepository _repository;
        private readonly ITestRepository _testRepository;
        private readonly ITaskRepository _taskRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly ITaskExecutionService _taskExecutionService;

        // private readonly ICourseExecutionValidator _validator;
        private readonly IMapper _mapper;

        public CourseExecutionService(ITaskExecutionService taskExecutionService, ICourseExecutionRepository repository, IMapper mapper, ITestRepository testRepository, ITaskRepository taskRepository, ICourseRepository courseRepository)
        {
            _taskExecutionService = taskExecutionService;
            _repository = repository;
            _testRepository = testRepository;
            _taskRepository = taskRepository;
            _courseRepository = courseRepository;

            //_validator = validator;
            _mapper = mapper;
        }

        public async Task<Response<IEnumerable<Models.Entities.CourseExecution>>> GetByUserIdAsync(Guid userId)
        {
            var result = await _repository.GetByUserIdWithCourseAsync(userId);
            return new Response<IEnumerable<Models.Entities.CourseExecution>>(result);
        }

        public async Task<Response<IEnumerable<Models.Entities.CourseExecution>>> GetAllAsync()
        {
            var result = await _repository.GetAllWithCourseIncluded();
            return new Response<IEnumerable<Models.Entities.CourseExecution>>(result);
        }
        
        public async Task<Response<Models.Entities.CourseExecution>> GetAsync(Guid id)
        {
            var result = await _repository.GetByIdWithTaskExecutions(id);
            return new Response<Models.Entities.CourseExecution>(result);
        }

        public async Task<Response<Models.Entities.CourseExecution>> Add(CourseExecutionDto courseExecutionDto)
        {
            var courseExecution = _mapper.Map<Models.Entities.CourseExecution>(courseExecutionDto);
            courseExecution.Successful = null;

          /*  var validationResult = _validator.Validate(course);

            if (!validationResult.IsValid)
                return new Response<Models.Entities.CourseExecution>(validationResult);*/

            var result = await _repository.Add(courseExecution);
            return new Response<Models.Entities.CourseExecution>(result);
        }

        public async Task<Response<Models.Entities.CourseExecution>> Evaluate(CourseExecutionDto courseExecutionDto)
        {
            var courseExecution = _mapper.Map<Models.Entities.CourseExecution>(courseExecutionDto);
            var course = await _courseRepository.GetById(courseExecution.CourseId);

            var successfulCompletedTasks = 0;

            foreach (var taskExecution in courseExecution.TaskExecutions)
            {
                var isTaskEvaluatedSuccessful = await _taskExecutionService.Evaluate(taskExecution);

                if(isTaskEvaluatedSuccessful)
                    successfulCompletedTasks++;
            }
            var isCourseSuccessful = course.MinimumTasksCompletedToSuccess <= successfulCompletedTasks;
      
            var result = await _repository.Evaluate(courseExecution.Id, isCourseSuccessful);
            return new Response<Models.Entities.CourseExecution>(result);
        }
    }
}
