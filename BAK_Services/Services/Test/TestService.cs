using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAK_Services.Exceptions;
using BAK_Services.Models;
using BAK_Services.Repositories.Task;
using BAK_Services.Repositories.Test;
using BAK_Services.Validators.Test;

namespace BAK_Services.Services.Test
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _repository;
        private readonly ITestValidator _validator;

        public TestService(ITestRepository repository, ITestValidator validator)
        {
            _repository = repository;
            _validator = validator;
        }

        public async Task<Response<IEnumerable<Models.Entities.Test>>> GetAsync(IEnumerable<Guid> testsIds = null)
        {
            IEnumerable<Models.Entities.Test> result;

            if (testsIds != null && testsIds.Count() > 0)
                result = await _repository.Find(t => testsIds.Contains(t.Id));
            else
                result = await _repository.GetAll();

            return new Response<IEnumerable<Models.Entities.Test>>(result);
        }

        public async Task<Response<IEnumerable<Models.Entities.Test>>> GetByTaskIdAsync(Guid taskId)
        {
            var result = await _repository.Find(t => t.TaskId == taskId);
            return new Response<IEnumerable<Models.Entities.Test>>(result);
        }

        public Response<Models.Entities.Test> AddAsync(Models.Entities.Test test)
        {
            var validationResult = _validator.Validate(test);

            if (!validationResult.IsValid)
                return new Response<Models.Entities.Test>(validationResult);

            _repository.Add(test);
            return new Response<Models.Entities.Test>(test);
        }

        public async Task<Response<Models.Entities.Test>> UpdateAsync(Models.Entities.Test test)
        {
            // if validation check failed
            // return new Response<Models.Entities.Task>(task, validationResult)

          /*  var updated = await _repository.UpdateAsync(test);
            return updated;*/
          return null;
        }

        public async void DeleteAsync(Guid id)
        {
            var testToBeDeleted = await _repository.GetById(id);

            if (testToBeDeleted == null)
                throw new EntityNotFoundException(nameof(testToBeDeleted)); 

            //_repository.Remove(testToBeDeleted);
        }
    }
}
