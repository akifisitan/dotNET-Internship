using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DatabaseContext;

namespace RealEstateApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PropertyStatusController : ControllerBase
    {
        private readonly RealEstateContext _context;

        public PropertyStatusController(RealEstateContext context)
        {
            _context = context;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.PropertyStatuses.ToListAsync();

            if (result == null)
                return NotFound();

            // var authorInfoList = new List<AuthorInfoDto>();
            // result.ForEach(author => authorInfoList.Add(new AuthorInfoDto(author)));

            return Ok(result);
        }

    }
}
