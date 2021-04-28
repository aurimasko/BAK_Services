using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAK_Services.Models
{
    /// <summary>
    /// Report that returned after logging the error
    /// </summary>
    public class LogReport
    {
        public LogReport(Error error)
        {
            Error = error;
        }

        public Guid IssueId => Error.Id;
        public Error Error { get; set; }
    }
}