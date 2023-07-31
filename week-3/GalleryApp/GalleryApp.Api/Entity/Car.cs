namespace GalleryApp.Api.Entity
{
    public class Car : BaseEntity
    {
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Price { get; set; }
        public string ImageUrl { get; set; }

        public Car()
        {
            Brand = string.Empty;
            Model = string.Empty;
            Price = 0;
            ImageUrl = string.Empty;
        }

        public Car(string brand, string model, int price, string imageUrl)
        {
            Brand = brand;
            Model = model;
            Price = price;
            ImageUrl = imageUrl;
        }
    }
}
