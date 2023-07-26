using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text;

namespace SummerSchool.Api.Middlewares
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LoggingMiddleware> _logger;

        public LoggingMiddleware(ILogger<LoggingMiddleware> logger, RequestDelegate next)
        {
            _logger = logger;
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            _logger.LogInformation("Request : {requestBody}", GetRequestBody(httpContext));
            await _next(httpContext);
            //_logger.LogInformation("Response : {responseBody}", GetResponseBody(httpContext));
        }

        protected static async Task<string> GetRequestBody(HttpContext httpContext)
        {
            var request = httpContext.Request;
            request.EnableBuffering();
            request.Body.Position = 0;
            var requestBody = await new System.IO.StreamReader(request.Body).ReadToEndAsync();
            return requestBody;
        }
    }

    public static class LoggingMiddlewareExtensions
    {
        public static IApplicationBuilder UseLoggingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<LoggingMiddleware>();
        }
    }
}
