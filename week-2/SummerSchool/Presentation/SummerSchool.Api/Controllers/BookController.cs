using Microsoft.AspNetCore.Mvc;
using SummerSchool.Api.DTO;
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
        public async Task<IActionResult> GetAll()
        {
            var bookList = new List<BookInfoDTO>();
            var result = await _handler.GetBooksAsync();
            result.ForEach(book => bookList.Add(new BookInfoDTO(book)));

            return Ok(bookList);
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            var book = await _handler.GetBookAsync(id);
            if (book == null)
                return NotFound();

            return Ok(new BookDetailDTO(book));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewBookDTO request)
        {
            var newBook = await _handler.AddBookAsync(request.ToBook());

            if (newBook == null)
                return NotFound(); // handle this
            else
                return Ok(new BookDetailDTO(newBook));
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditBookDTO request)
        {
            var editBook = await _handler.UpdateBookAsync(request.ToBook());

            if (editBook == null)
                return NotFound();      // handle this
            else
                return Ok(new BookDetailDTO(editBook));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _handler.DeleteBookAsync(id);

            if (!result)
                return NotFound();
            else
                return NoContent();
        }
    }
}
