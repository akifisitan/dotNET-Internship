namespace GalleryApp.Api.DTO
{
    public class RequestDTO
    {
        public List<IFormFile> Files { get; set; }
        public string Name { get; set; }
        public int Id { get; set; }

    }
}
