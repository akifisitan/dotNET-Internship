using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DatabaseContext;
using RealEstateApp.Api.DTO.PropertyDTO;
using RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PropertyController : ControllerBase
    {

        private readonly RealEstateContext _context;

        public PropertyController(RealEstateContext context)
        {
            _context = context;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] PropertyCreateRequestDTO request)
        {
            int userId = Convert.ToInt32(User.FindFirst("Id")?.Value);
            var newProperty = new Property
            {
                StartDate = DateTime.Parse(request.StartDate),
                EndDate = DateTime.Parse(request.EndDate),
                TypeId = request.PropertyTypeId,
                StatusId = request.PropertyStatusId,
                CurrencyId = request.CurrencyId,
                Price = request.Price,
                UserId = userId
            };
            var res = new List<string>();
            foreach (var file in request.Photos)
            {
                if (file.Length > 0)
                {
                    using var memoryStream = new MemoryStream();
                    await file.CopyToAsync(memoryStream);

                    // upload the file if less than 4 mb  
                    if (memoryStream.Length < 4 * 1024 * 1024)
                    {
                        var photo = Convert.ToBase64String(memoryStream.ToArray());
                        res.Add(photo);
                    }
                    else
                    {
                        ModelState.AddModelError("File", "The file is too large.");
                        return BadRequest(ModelState);
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            var addedProperty = _context.Properties.Add(newProperty);
            foreach (var photoString in res)
            {
                var newImage = new PropertyImage
                {
                    PropertyId = addedProperty.Entity.Id,
                    ImageUrl = photoString
                };
                _context.PropertyImages.Add(newImage);
            }
            await _context.SaveChangesAsync();
            return Ok(res);
        }
    }

}
