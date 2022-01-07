using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation.Results;

namespace BAK_Services.Models
{
    /// <summary>
    /// Any response without content return defining the status of response (successful or not) and any error that occured during it
    /// </summary>
    public class Response
    {
        protected Response()
        {
            ErrorCodes = new List<ErrorCodesEnum>();
            ErrorMessages = new List<string>();
        }

        public Response(bool isSuccess)
        {
            IsSuccess = isSuccess;
        }

        /// <summary>
        /// Constructor for unsuccessful response with errors
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        public Response(params string[] errorMessages) : this(errorMessages.ToList()) { }

        /// <summary>
        /// Constructor for unsuccessful response with one error code
        /// </summary>
        /// <param name="errorCode">Error code of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(ErrorCodesEnum errorCode) : this()
        {
            IsSuccess = false;
            ErrorCodes.Add(errorCode);
        }

        /// <summary>
        /// Constructor for unsuccessful response with error codes
        /// </summary>
        /// <param name="errorCodes">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(IEnumerable<ErrorCodesEnum> errorCodes) : this()
        {
            IsSuccess = false;
            ErrorCodes.AddRange(errorCodes);
        }

        /// <summary>
        /// Constructor for unsuccessful response with exception
        /// </summary>
        /// <param name="innerException">Inner exception</param>
        public Response(Exception innerException) : this()
        {
            IsSuccess = false;
            InnerException = innerException;
            ErrorCodes.Add(ErrorCodesEnum.Exception);
        }

        /// <summary>
        /// Constructor for unsuccessful response with error codes and exception
        /// </summary>
        /// <param name="errorCodes">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        /// <param name="innerException">Inner exception</param>
        public Response(Exception innerException, IEnumerable<ErrorCodesEnum> errorCodes) : this()
        {
            IsSuccess = false;
            ErrorCodes.AddRange(errorCodes);
            InnerException = innerException;
        }

        /// <summary>
        /// Constructor for unsuccessful response with errors
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        public Response(IEnumerable<string> errorMessages) : this()
        {
            IsSuccess = false;
            ErrorMessages.AddRange(errorMessages);
            ErrorCodes.Add(ErrorCodesEnum.GenericError);
        }

        /// <summary>
        /// Constructor for unsuccessful response with errors
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        /// <param name="errorCodesEnums">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(IEnumerable<string> errorMessages, IEnumerable<ErrorCodesEnum> errorCodesEnums) : this()
        {
            IsSuccess = false;
            ErrorMessages.AddRange(errorMessages);
            ErrorCodes.AddRange(errorCodesEnums);
        }

        /// <summary>
        /// Constructor for unsuccessful response with errors
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        /// <param name="errorCodesEnums">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(IEnumerable<ErrorCodesEnum> errorCodesEnums, IEnumerable<string> errorMessages) : this(errorMessages, errorCodesEnums)
        {
        }

        /// <summary>
        /// Constructor for unsuccessful response with errors and exception
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        /// <param name="innerException">Inner exception</param>
        /// <param name="errorCodesEnums">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(Exception innerException, IEnumerable<string> errorMessages, IEnumerable<ErrorCodesEnum> errorCodesEnums) : this(errorMessages, errorCodesEnums)
        {
            InnerException = innerException;
        }

        /// <summary>
        /// Constructor for unsuccessful response with errors and exception
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        /// <param name="innerException">Inner exception</param>
        /// <param name="errorCodesEnums">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(Exception innerException, IEnumerable<ErrorCodesEnum> errorCodesEnums, IEnumerable<string> errorMessages) : this(innerException, errorMessages, errorCodesEnums)
        {
        }

        /// <summary>
        /// Constructor for unsuccessful response with errors and exception
        /// </summary>
        /// <param name="errorMessage">Error message</param>
        /// <param name="innerException">Inner exception</param>
        /// <param name="errorCodesEnum">Error code of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(Exception innerException, string errorMessage, ErrorCodesEnum errorCodesEnum) : this(errorMessage, errorCodesEnum)
        {
            InnerException = innerException;
        }

        /// <summary>
        /// Constructor for unsuccessful response with validation errors
        /// </summary>
        /// <param name="errorMessage">Error message</param>
        /// <param name="errorCodesEnum">Error code of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(string errorMessage, ErrorCodesEnum errorCodesEnum) : this()
        {
            IsSuccess = false;
            ErrorCodes.Add(errorCodesEnum);
            ErrorMessages.Add(errorMessage);
        }

        /// <summary>
        /// Constructor for unsuccessful response with validation errors
        /// </summary>
        /// <param name="errorMessage">Error message</param>
        /// <param name="errorCodesEnum">Error code of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(ErrorCodesEnum errorCodesEnum, string errorMessage) : this(errorMessage, errorCodesEnum)
        {
        }

        public Response(ValidationResult validationResult)
        {
            IsSuccess = validationResult.IsValid;
            ErrorMessages = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
        }

        [JsonProperty(PropertyName = "isSuccess")]
        public bool IsSuccess { get; set; }

        [JsonProperty(PropertyName = "errorCodes")]
        public List<ErrorCodesEnum> ErrorCodes { get; set; }

        /// <summary>
        /// Additional error messages
        /// </summary>
        /// 
        [JsonProperty(PropertyName = "errorMessages")]
        public List<string> ErrorMessages { get; set; }

        /// <summary>
        /// Used for inner logging, ignored for json serialization
        /// </summary>
        [JsonIgnore]
        public Exception InnerException { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }

    }

    /// <summary>
    /// Any response return defining the status of response (successful or not) and any error that occured during it
    /// </summary>
    /// <typeparam name="T">Response type</typeparam>
    public class Response<T> : Response
    {
        public Response(ValidationResult validationResult) : base(validationResult) { }
        public Response() { }

        /// <summary>
        /// Constructor for successful response
        /// </summary>
        /// <param name="content">Response of type <typeparamref name="T">T</typeparamref></param>
        public Response(T content) : base(true)
        {
            Content = content;
        }

        /// <summary>
        /// Constructor for unsuccessful response with one error code
        /// </summary>
        /// <param name="errorCode">Error code of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(ErrorCodesEnum errorCode) : base(errorCode) { }

        /// <summary>
        /// Constructor for unsuccessful response with error codes
        /// </summary>
        /// <param name="errorCodes">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(IEnumerable<ErrorCodesEnum> errorCodes) : base(errorCodes) { }

        /// <summary>
        /// Constructor for unsuccessful response with error codes
        /// </summary>
        /// <param name="errorCodes">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(params ErrorCodesEnum[] errorCodes) : this(errorCodes.ToList()) { }


        /// <summary>
        /// Constructor for unsuccessful response with exception
        /// </summary>
        /// <param name="innerException">Inner exception</param>
        public Response(Exception innerException) : base(innerException) { }


        /// <summary>
        /// Constructor for unsuccessful response with error codes and exception
        /// </summary>
        /// <param name="errorCodes">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        /// <param name="innerException">Inner exception</param>
        public Response(Exception innerException, IEnumerable<ErrorCodesEnum> errorCodes) : base(innerException, errorCodes) { }

        /// <summary>
        /// Constructor for unsuccessful response with error codes and exception
        /// </summary>
        /// <param name="innerException">Inner exception</param>
        /// <param name="errorCodes">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(Exception innerException, params ErrorCodesEnum[] errorCodes) : this(innerException, errorCodes.ToList()) { }

        /// <summary>
        /// Constructor for unsuccessful response with errors
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        public Response(IEnumerable<string> errorMessages) : base(errorMessages) { }

        /// <summary>
        /// Constructor for unsuccessful response with errors
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        public Response(params string[] errorMessages) : base(errorMessages) { }

        /// <summary>
        /// Constructor for unsuccessful response with errors
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        /// <param name="errorCodesEnums">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(IEnumerable<string> errorMessages, IEnumerable<ErrorCodesEnum> errorCodesEnums) : base(errorMessages, errorCodesEnums) { }

        /// <summary>
        /// Constructor for unsuccessful response with errors and exception
        /// </summary>
        /// <param name="errorMessages">Error messages</param>
        /// <param name="innerException">Inner exception</param>
        /// <param name="errorCodesEnums">Error codes list of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(Exception innerException, IEnumerable<string> errorMessages, IEnumerable<ErrorCodesEnum> errorCodesEnums) : base(innerException, errorMessages, errorCodesEnums) { }


        /// <summary>
        /// Constructor for unsuccessful response with errors and exception
        /// </summary>
        /// <param name="errorMessage">Error message</param>
        /// <param name="innerException">Inner exception</param>
        /// <param name="errorCodesEnum">Error code of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(Exception innerException, string errorMessage, ErrorCodesEnum errorCodesEnum) : base(innerException, errorMessage, errorCodesEnum) { }

        /// <summary>
        /// Constructor for unsuccessful response with validation errors
        /// </summary>
        /// <param name="errorMessage">Error message</param>
        /// <param name="errorCodesEnum">Error code of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(string errorMessage, ErrorCodesEnum errorCodesEnum) : base(errorMessage, errorCodesEnum) { }

        /// <summary>
        /// Constructor for unsuccessful response with validation errors
        /// </summary>
        /// <param name="errorMessage">Error message</param>
        /// <param name="errorCodesEnum">Error code of type <see cref="ErrorCodesEnum">Error codes enum</see></param>
        public Response(ErrorCodesEnum errorCodesEnum, string errorMessage) : this(errorMessage, errorCodesEnum) { }

        [JsonProperty(PropertyName = "content")]
        public T Content { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }

        /// <summary>
        /// Converts from RestSharp IRestRequest to Response
        /// </summary>
        /// <param name="response">IRestResponse object</param>
        /// <returns>Response object</returns>
        public static Response<T> ConvertFromRestResponse(IRestResponse<Response<T>> response)
        {
            if (response.ResponseStatus == ResponseStatus.Completed)
                return response.Data;
            else
                return new Response<T>(response.ErrorException, response.ErrorMessage, ErrorCodesEnum.NetworkError);

        }
    }


    public enum ErrorCodesEnum
    {
        GenericError,
        Exception,
        NullReference,
        NotFound,
        /// <summary>
        /// Used if concurrency exception occured while updating a property
        /// </summary>
        ConcurrencyException,
        /// <summary>
        /// Used when validation error occured (model validation and etc.)
        /// </summary>
        ValidationErrors,
        /// <summary>
        /// User in identityservice
        /// </summary>
        UsernameOrPasswordIsIncorrect,
        NetworkError,
        UserIsDisabled
    }
}