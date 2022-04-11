﻿using System;
using System.Collections.Generic;
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

        // private readonly ICourseExecutionValidator _validator;
        private readonly IMapper _mapper;

        public CourseExecutionService(ICourseExecutionRepository repository, IMapper mapper, ITestRepository testRepository, ITaskRepository taskRepository, ICourseRepository courseRepository)
        {
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

        public async Task<Response<Models.Entities.CourseExecution>> GetAsync(Guid id)
        {
            var result = await _repository.GetById(id);
            return new Response<Models.Entities.CourseExecution>(result);
        }

        public async Task<Response<Models.Entities.CourseExecution>> Add(CourseExecutionDto courseExecutionDto)
        {
            var courseExecution = _mapper.Map<Models.Entities.CourseExecution>(courseExecutionDto);
            int completedTasks = 0;

          /*  var validationResult = _validator.Validate(course);

            if (!validationResult.IsValid)
                return new Response<Models.Entities.CourseExecution>(validationResult);*/

            foreach (var taskExecution in courseExecution.TaskExecutions)
            {
                // to do: execute tests
                // some mocked tests added
                var taskTests = await _testRepository.Find(t => t.TaskId.Equals(taskExecution.TaskId));

                foreach(var test in taskTests)
                {
                    var executedTest = new TaskExecutionTest
                    {
                        TaskExecution = taskExecution,
                        Test = test,
                        Completed = true
                    };
                    test.TaskExecutionsTests.Add(executedTest);
                    taskExecution.TaskExecutionsTests.Add(executedTest);
                }

                var completedTests = taskExecution.TaskExecutionsTests.Count(x => x.Completed);
                var task = await _taskRepository.GetById(taskExecution.TaskId);

                if (completedTests >= task.MinimumTestsCompletedToSuccess)
                {
                    taskExecution.Successful = true;
                    completedTasks++;
                }
                else
                {
                    taskExecution.Successful = false;
                }
            }

            var course = await _courseRepository.GetById(courseExecution.CourseId);
            courseExecution.Successful = completedTasks >= course.MinimumTasksCompletedToSuccess;
            
            var result = await _repository.Add(courseExecution);
            return new Response<Models.Entities.CourseExecution>(result);
        }
    }
}