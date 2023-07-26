using Microsoft.AspNetCore.Mvc;
using SummerSchool.App.Handler;
using SummerSchool.Entity.Entity;

namespace SummerSchool.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookHandler _handler;
        private readonly ILogger<BookController> _logger;
        public BookController(ILogger<BookController> logger, BookHandler handler)
        {
            _handler = handler;
            _logger = logger;
        }

        [HttpGet]
        [Route("list")]
        public IActionResult Get()
        {
            return Ok(_handler.GetBooks());
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            return Ok(_handler.GetBook(id));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Book request)
        {
            var result = _handler.AddBook(request);

            if (!result)
                return NotFound();
            else
                return Ok();
        }

        [HttpPut]
        public IActionResult Put([FromBody] Book request)
        {
            var result = _handler.UpdateBook(request);

            if (!result)
                return NotFound();
            else
                return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var result = _handler.DeleteBook(id);

            if (!result)
                return NotFound();
            else
                return Ok();
        }
    }
}
