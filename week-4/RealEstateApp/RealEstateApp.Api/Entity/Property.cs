namespace RealEstateApp.Api.Entity
{
    public class Property : BaseEntity
    {
        public string Type { get; set; }
        public string Status { get; set; }
        public int Price { get; set; }

        public string Currency { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int UserId { get; set; }

        public User User { get; set; }
        public ICollection<PropertyImage> PropertyImages { get; set; }
    }
}
