using GalleryApp.Api.DatabaseContext;
using GalleryApp.Api.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GalleryApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GalleryController : ControllerBase
    {
        private readonly ILogger<GalleryController> _logger;
        protected readonly CarContext _context;
        protected readonly DbSet<Car> _set;
        protected readonly DbSet<Base64Photo> _base64Photo;
        protected readonly DbSet<BytePhoto> _bytePhoto;

        public GalleryController(CarContext carContext, ILogger<GalleryController> logger)
        {
            _context = carContext;
            _set = _context.Set<Car>();
            _base64Photo = _context.Set<Base64Photo>();
            _bytePhoto = _context.Set<BytePhoto>();
            _logger = logger;
        }

        [HttpPost]
        [Route("saveToDatabase")]
        public async Task<IActionResult> SaveToDatabase(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest();
            }
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);

            byte[] fileBytes = memoryStream.ToArray();
            string base64String = Convert.ToBase64String(fileBytes);
            return Ok(base64String);
        }

        [HttpPost]
        [Route("saveImageAsByteArray")]
        public async Task<IActionResult> saveImageAsByteArray(IFormFile file)
        {
            if (file.Length > 0)
            {
                var photo = new BytePhoto();
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);

                    // Upload the file if less than 4 MB  
                    if (memoryStream.Length < 2 * 2097152)
                    {
                        photo.Value = memoryStream.ToArray();
                    }
                    _bytePhoto.Add(photo);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("getImageFromByteArray")]
        public async Task<IActionResult> getImageFromByteArray()
        {
            var photo = await _bytePhoto.FirstOrDefaultAsync();
            return File(photo.Value, "image/jpeg");
        }

        [HttpPost]
        [Route("saveImageAsBase64String")]
        public async Task<IActionResult> SaveImageAsBase64String(IFormFile file)
        {
            if (file.Length > 0)
            {
                var photo = new Base64Photo();
                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);

                // Upload the file if less than 4 MB  
                if (memoryStream.Length < 8 * 1024 * 1024)
                {
                    photo.Value = Convert.ToBase64String(memoryStream.ToArray());
                }
                _base64Photo.Add(photo);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("getImageFromBase64String")]
        public async Task<IActionResult> getImageFromBase64String()
        {
            var photo = await _base64Photo.FirstOrDefaultAsync();
            byte[] bytes = Convert.FromBase64String(photo.Value);
            return File(bytes, "image/jpeg");
        }

        [HttpPost]
        [Route("saveToDisk")]
        public async Task<IActionResult> SaveToDisk(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest();
            }
            try
            {
                // Specify the custom folder path where you want to save the file
                string imagePath = AppDomain.CurrentDomain.BaseDirectory + "\\images";

                // Create the custom folder if it doesn't exist
                if (!Directory.Exists(imagePath))
                {
                    Directory.CreateDirectory(imagePath);
                }

                // Get the file name from the IFormFile object
                // string fileName = Path.GetFileName(file.FileName);
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;


                // Combine the custom path and the file name to get the full path of the file on disk
                string filePath = Path.Combine(imagePath, uniqueFileName);

                // Save the file to disk using the CopyToAsync method
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Return a success response
                return Ok($"File '{file.FileName}' has been uploaded and saved as '{uniqueFileName}'.");
            }
            catch (Exception ex)
            {
                // Handle any errors that occur during the file upload process
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while uploading the file: {ex.Message}");
            }
        }

    }
}
