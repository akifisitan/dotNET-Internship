using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DatabaseContext;
using RealEstateApp.Api.DTO;
using RealEstateApp.Api.DTO.PropertyDTO;
using RealEstateApp.Api.DTO.PropertyFieldDTO;
using RealEstateApp.Api.DTO.UserDTO;
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

        // [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("getById")]
        public async Task<IActionResult> GetById(int id)
        {
            // int userId = Convert.ToInt32(User.FindFirst("Id")?.Value);

            var result = await _context.Properties.AsNoTracking()
                .Where(p => p.Id == id)
                .Include(x => x.PropertyImages)
                .Include(x => x.User)
                .Include(x => x.Currency)
                .Include(x => x.PropertyStatus)
                .Include(x => x.PropertyType)
                .FirstOrDefaultAsync();
            if (result == null)
            {
                return NotFound();
            }
            var images = new List<PropertyFieldInfoDTO<PropertyImage>>();
            foreach (var image in result.PropertyImages)
            {
                var newImage = new PropertyFieldInfoDTO<PropertyImage>
                {
                    Value = image.Value
                };
                images.Add(newImage);
            }
            var dto = new PropertyQueryDTO
            {
                Id = result.Id,
                Images = images,
                Status = new PropertyFieldInfoDTO<PropertyStatus>(result.PropertyStatus),
                Type = new PropertyFieldInfoDTO<PropertyType>(result.PropertyType),
                Currency = new PropertyFieldInfoDTO<Currency>(result.Currency),
                User = new UserInfoDTO(result.User),
                StartDate = result.StartDate,
                EndDate = result.EndDate
            };
            System.Console.WriteLine(dto);
            return Ok(dto);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("getByUserId")]
        public async Task<IActionResult> ListByUser()
        {
            int userId = Convert.ToInt32(User.FindFirst("Id")?.Value);

            var result = await _context.Properties.AsNoTracking()
                .Where(x => x.UserId == userId)
                .Include(x => x.PropertyImages)
                .Include(x => x.User)
                .Include(x => x.Currency)
                .Include(x => x.PropertyStatus)
                .Include(x => x.PropertyType)
                .ToListAsync();
            if (result == null)
            {
                return NotFound();
            }
            var dtos = new List<PropertyListDTO>();
            foreach (var property in result)
            {
                var image = new PropertyFieldInfoDTO<PropertyImage>
                {
                    Value = property.PropertyImages.First().Value
                };

                var dto = new PropertyListDTO
                {
                    Id = property.Id,
                    Thumbnail = image.Value,
                    Status = property.PropertyStatus.Value,
                    Type = property.PropertyType.Value,
                    Currency = property.Currency.Value,
                    Price = property.Price
                };
                dtos.Add(dto);
            }
            return Ok(dtos);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpPost]
        public async Task<IActionResult> Insert([FromForm] PropertyCreateRequestDTO request)
        {
            var response = new GenericResponse<PropertyCreateResponseDTO>();
            if (!DateTime.TryParseExact(request.StartDate, "dd/MM/yyyy",
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out DateTime parsedStartDate) ||
                !DateTime.TryParseExact(request.EndDate, "dd/MM/yyyy",
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out DateTime parsedEndDate))
            {
                response.Message = "Please enter a valid date in dd/MM/yyyy format.";
                return BadRequest(response);
            }
            if (parsedStartDate > parsedEndDate)
            {
                response.Message = "Please make sure the start date is earlier than the end date.";
                return BadRequest(response);
            }
            int userId = Convert.ToInt32(User.FindFirst("Id")?.Value);
            var newProperty = new Property
            {
                StartDate = parsedStartDate,
                EndDate = parsedEndDate,
                PropertyTypeId = request.PropertyTypeId,
                PropertyStatusId = request.PropertyStatusId,
                CurrencyId = request.CurrencyId,
                Price = request.Price,
                UserId = userId
            };
            var imageStrings = new List<string>();
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
                        imageStrings.Add(photo);
                    }
                    else
                    {
                        response.Message = "One or more of the files is too large.";
                        return BadRequest(response);
                    }
                }
            }
            if (imageStrings.Count == 0)
            {
                response.Message = "Please upload at least one image.";
                return BadRequest(response);
            }
            var addedProperty = _context.Properties.Add(newProperty);
            await _context.SaveChangesAsync();
            var propertyId = addedProperty.Entity.Id;
            foreach (var imageString in imageStrings)
            {
                var newImage = new PropertyImage
                {
                    PropertyId = propertyId,
                    Value = imageString
                };
                _context.PropertyImages.Add(newImage);
            }
            await _context.SaveChangesAsync();
            var data = new PropertyCreateResponseDTO
            {
                Id = propertyId,
                StartDate = parsedStartDate,
                EndDate = parsedEndDate,
                TypeId = request.PropertyTypeId,
                StatusId = request.PropertyStatusId,
                CurrencyId = request.CurrencyId,
                Price = request.Price,
                UserId = userId,
                Images = imageStrings
            };
            response.Data = data;
            response.Message = "Property Creation Successful.";
            return Ok(response);
        }



    }

}
