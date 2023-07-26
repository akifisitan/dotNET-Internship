using Microsoft.AspNetCore.Mvc;
using SummerSchool.App.Entity;
using SummerSchool.App.Handler;

namespace SummerSchool.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookHandler _handler;
        public BookController(BookHandler handler)
        {
            _handler = handler;
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
