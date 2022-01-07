using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BAK_Services.DTO;
using BAK_Services.Exceptions;
using BAK_Services.Models;
using BAK_Services.Repositories.Task;
using BAK_Services.Validators.Task;

namespace BAK_Services.Services.Task
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;
        private readonly ITaskValidator _validator;
        private readonly IMapper _mapper;

        public TaskService(ITaskRepository repository, ITaskValidator validator, IMapper mapper)
        {
            _repository = repository;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<Response<IEnumerable<Models.Entities.Task>>> GetAsync(IEnumerable<Guid> tasksIds = null)
        {
            IEnumerable<Models.Entities.Task> result;

            if (tasksIds != null && tasksIds.Count() > 0)
                result = await _repository.Find(t => tasksIds.Contains(t.Id));
            else
                result = await _repository.GetAll();

            return new Response<IEnumerable<Models.Entities.Task>>(result);
        }

        public async Task<Response<IEnumerable<Models.Entities.Task>>> GetByCourseIdAsync(Guid courseId)
        {
            var result = await _repository.Find(t => t.CourseId == courseId);
            return new Response<IEnumerable<Models.Entities.Task>>(result);
        }

        public Response<Models.Entities.Task> AddAsync(TaskDto taskDto)
        {
            var task = _mapper.Map<TaskDto, Models.Entities.Task>(taskDto);

            var validationResult = _validator.Validate(task);

            if (!validationResult.IsValid)
                return new Response<Models.Entities.Task>(validationResult);

            _repository.Add(task);
            return new Response<Models.Entities.Task>(task);
        }

        public async Task<Response<Models.Entities.Task>> UpdateAsync(TaskDto taskDto)
        {
            var task = _mapper.Map<TaskDto, Models.Entities.Task>(taskDto);

            var validationResult = _validator.Validate(task);

            if (!validationResult.IsValid)
                return new Response<Models.Entities.Task>(validationResult);

            var updatableTask = _repository.GetById(task.Id);
            _repository.ValidateConcurrencyToken(updatableTask.Result, task.ConcurrencyToken);

            var updated = await _repository.UpdateAsync(updatableTask.Result, task);
            return updated;
        }

        public async void DeleteAsync(Guid id)
        {
            var taskToBeDeleted = await _repository.GetById(id);

            if (taskToBeDeleted == null)
                throw new EntityNotFoundException(nameof(taskToBeDeleted)); 

            await _repository.Remove(taskToBeDeleted);
        }
    }
}
