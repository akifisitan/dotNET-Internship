namespace GalleryApp.Api.Entity
{
    public class Car : BaseEntity
    {
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Price { get; set; }
        public string ImageUrl { get; set; }
        public byte[] Image { get; set; }

    }
}
