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

        public GalleryController(CarContext carContext, ILogger<GalleryController> logger)
        {
            _context = carContext;
            _set = _context.Set<Car>();
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
