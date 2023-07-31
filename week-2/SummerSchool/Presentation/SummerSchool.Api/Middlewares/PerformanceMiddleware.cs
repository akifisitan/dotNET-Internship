using System.Diagnostics;

namespace SummerSchool.Api.Middlewares
{
    public class PerformanceMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<PerformanceMiddleware> _logger;

        public PerformanceMiddleware(ILogger<PerformanceMiddleware> logger, RequestDelegate next)
        {
            _logger = logger;
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();

            await _next(httpContext);

            sw.Stop();
            _logger.LogInformation("CorrId with {corrId} request elapsed time is {elapsed}", 
                httpContext.Request.Headers[TraceMiddleware.CORR_ID], 
                sw.Elapsed);
        }
    }

    public static class PerformanceMiddlewareExtensions
    {
        public static IApplicationBuilder UsePerformanceMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<PerformanceMiddleware>();
        }
    }
}