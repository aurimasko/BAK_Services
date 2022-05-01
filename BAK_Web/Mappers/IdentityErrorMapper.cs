using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace BAK_Web.Mappers
{
    public static class IdentityErrorMapper
    {
        public static string MapIdentityErrorToErrorMessage(IdentityError identityError)
        {
            return identityError.Code;
        }

        public static IEnumerable<string> MapIdentityErrorsToErrorMessages(
            IEnumerable<IdentityError> collectionOfIdentityErrors)
        {
            return collectionOfIdentityErrors.Select(x => MapIdentityErrorToErrorMessage(x)).ToList();
        }
    }
}
