using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Exceptions
{
    public class EntityNotFoundException : Exception
    {
        public EntityNotFoundException() : base("Not Found")
        {
        }

        public EntityNotFoundException(string message) : base(message)
        {
        }

        /// <summary>
        /// Formats exception message to: 'entityName' with id 'id' not found.
        /// </summary>
        /// <param name="entityName">Entity name.</param>
        /// <param name="entityId">Entity Id.</param>
        public EntityNotFoundException(string entityName, Guid entityId) : base($"{entityName} with id '{entityId}' not found.")
        {
        }

        public EntityNotFoundException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}
