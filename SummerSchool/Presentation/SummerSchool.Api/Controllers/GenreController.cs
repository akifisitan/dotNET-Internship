using Microsoft.AspNetCore.Mvc;
using SummerSchool.App.Handler;
using SummerSchool.Entity.Entity;

namespace SummerSchool.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GenreController: ControllerBase
    {

        private readonly GenreHandler _handler;
        private readonly ILogger<GenreController> _logger;
        public GenreController(ILogger<GenreController> logger, GenreHandler handler)
        {
            _handler = handler;
            _logger = logger;
        }

        [HttpGet]
        [Route("list")]
        public IActionResult Get()
        {
            return Ok(_handler.GetGenres());
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            return Ok(_handler.GetGenre(id));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Genre request)
        {
            var result = _handler.AddGenre(request);

            if (!result)
                return NotFound();
            else
                return Ok();
        }

        [HttpPut]
        public IActionResult Put([FromBody] Genre request)
        {
            var result = _handler.UpdateGenre(request);

            if (!result)
                return NotFound();
            else
                return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var result = _handler.DeleteGenre(id);

            if (!result)
                return NotFound();
            else
                return Ok();
        }


    }
}
