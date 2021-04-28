using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAK_Services.Models
{
    /// <summary>
    /// Used for saving errors to database
    /// </summary>
    public class Error
    {
        private Error()
        {
            TimeStamp = DateTime.UtcNow;
        }

        public Error(Exception exception, HttpRequest request) : this(exception.Message, request)
        {
            StackTrace = exception.StackTrace;
        }

        public Error(string message, HttpRequest request) : this(message)
        {
            RequestHttpHeaders = JsonConvert.SerializeObject(request.Headers);
            //RequestQueryStrings = JsonConvert.SerializeObject(request.Query.Keys.ToDictionary(k => k, k => request.Query[k]));
            RequestQueryStrings = JsonConvert.SerializeObject(request.QueryString);
            //Read body if possible
            try
            {
                if (request.Method == "PUT" || request.Method == "POST")
                {
                    if (request.HasFormContentType)
                    {
                        RequestBody = JsonConvert.SerializeObject(request.Form);
                    }
                    else
                    {
                        if (request.Body.Length > 0)
                        {
                            byte[] buffer = new byte[request.Body.Length];
                            var bodyReadSize = request.Body.Read(buffer, 0, (int)request.Body.Length);
                            var str = Encoding.UTF8.GetString(buffer);
                            RequestBody = JsonConvert.SerializeObject(str);
                        }
                    }
                }
            }
            catch { }

            RequestContentType = request.ContentType;
            RequestMethod = request.Method;
            RequestUrl = request.Path.ToString();

        }

        public Error(string message) : this()
        {
            Message = message;
        }

        public Error(Exception exception) : this()
        {
            StackTrace = exception.StackTrace;
            Message = exception.Message;
        }

        [Key]
        public Guid Id { get; set; }


        /// <summary>
        /// UTC date time
        /// </summary>
        [Required]
        public DateTime TimeStamp { get; set; }

        /// <summary>
        /// Stacktrace of exception
        /// </summary>
        public string StackTrace { get; set; }

        /// <summary>
        /// Error message
        /// </summary>
        [Required]
        public string Message { get; set; }

        /// <summary>
        /// Request http headers as key value pair json
        /// </summary>
        public string RequestHttpHeaders { get; set; }

        /// <summary>
        /// Request query string as json
        /// </summary>
        public string RequestQueryStrings { get; set; }

        /// <summary>
        /// Request method (GET, PUT, PATCH, POST, DELETE, FETCH)
        /// </summary>
        public string RequestMethod { get; set; }

        /// <summary>
        /// Request url
        /// </summary>
        public string RequestUrl { get; set; }

        /// <summary>
        /// Request body as json
        /// </summary>
        public string RequestBody { get; set; }

        /// <summary>
        /// Request content type
        /// </summary>
        public string RequestContentType { get; set; }


    }
}