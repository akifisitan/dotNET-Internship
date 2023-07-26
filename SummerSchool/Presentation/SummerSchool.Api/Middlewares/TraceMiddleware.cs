using System.Diagnostics;
using System.Linq;

namespace SummerSchool.Api.Middlewares
{
    public class TraceMiddleware
    {
        public const string CORR_ID = "CorrId";
        private readonly RequestDelegate _next;
        private readonly ILogger<TraceMiddleware> _logger;

        public TraceMiddleware(ILogger<TraceMiddleware> logger, RequestDelegate next)
        {
            _logger = logger;
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            if (!httpContext.Request.Headers.ContainsKey(CORR_ID))
            {
                httpContext.Request.Headers.Add(CORR_ID, Guid.NewGuid().ToString());
            }
            _logger.LogInformation("Request with CorrId {corrId} started at {datetime}", httpContext.Request.Headers[TraceMiddleware.CORR_ID], DateTime.Now);
            await _next(httpContext);
        }
    }

    public static class TraceMiddlewareMiddlewareExtensions
    {
        public static IApplicationBuilder UseTraceMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TraceMiddleware>();
        }
    }
}
