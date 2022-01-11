using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BAK_Services.DTO;
using BAK_Services.Exceptions;
using BAK_Services.Models;
using BAK_Services.Repositories.Task;
using BAK_Services.Repositories.TaskExecution;
using BAK_Services.Validators.TaskExecution;
using Microsoft.AspNetCore.Http;
using Microsoft.Web.Helpers;
using Mapper = BAK_Services.DTO.AutoMapper.Mapper;

namespace BAK_Services.Services.TaskExecution
{
    public class TaskExecutionService : ITaskExecutionService
    {
        private readonly ITaskExecutionRepository _repository;
        private readonly IMapper _mapper;
        private readonly ITaskExecutionValidator _validator;

        public TaskExecutionService(ITaskExecutionRepository repository, IMapper mapper, ITaskExecutionValidator validator)
        {
            _repository = repository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<IEnumerable<Models.Entities.TaskExecution>>> GetAsync(IEnumerable<Guid> taskExecutionsIds = null)
        {
            IEnumerable<Models.Entities.TaskExecution> result;

            if (taskExecutionsIds != null && taskExecutionsIds.Count() > 0)
                result = await _repository.Find(t => taskExecutionsIds.Contains(t.Id));
            else
                result = await _repository.GetAll();

            return new Response<IEnumerable<Models.Entities.TaskExecution>>(result);
        }

        public async Task<Response<IEnumerable<Models.Entities.TaskExecution>>> GetByCourseExecutionIdAsync(Guid courseExecutionId)
        {
            var result = await _repository.GetByCourseExecutionIdAsync(courseExecutionId);
            return new Response<IEnumerable<Models.Entities.TaskExecution>>(result);
        }

        public async Task<Response<IEnumerable<Models.Entities.TaskExecution>>> GetByTaskIdAsync(Guid taskId)
        {
            var result = await _repository.Find(t => t.TaskId == taskId);
            return new Response<IEnumerable<Models.Entities.TaskExecution>>(result);
        }

        public Response<Models.Entities.TaskExecution> AddAsync(TaskExecutionDto taskExecutionDto)
        {
            var taskExecution = _mapper.Map<TaskExecutionDto, Models.Entities.TaskExecution>(taskExecutionDto);

            var validationResult = _validator.Validate(taskExecution);

            if (!validationResult.IsValid)
                return new Response<Models.Entities.TaskExecution>(validationResult);
            
            
            _repository.Add(taskExecution);
            return new Response<Models.Entities.TaskExecution>(taskExecution);
        }

        public Task<Response<Models.Entities.TaskExecution>> UpdateAsync(Models.Entities.Task taskExecution)
        {
          /*  if (taskExecution.Id == Guid.Empty)
                return new Response<Models.Entities.TaskExecution>(ErrorCodesEnum.ValidationErrors, Config.LocalizationService.Localize("IsRequired", Config.LocalizationService.Localize("Id")));

            // if validation check failed
            // return new Response<Models.Entities.Task>(task, validationResult)

            var updated = await _repository.UpdateAsync(taskExecution);
            return updated;*/
          return null;
        }

        public async void DeleteAsync(Guid id)
        {
            var taskExecutionToBeDeleted = await _repository.GetById(id);

            if (taskExecutionToBeDeleted == null)
                throw new EntityNotFoundException(nameof(taskExecutionToBeDeleted)); 

         //   _repository.Remove(taskExecutionToBeDeleted);
        }
    }
}
