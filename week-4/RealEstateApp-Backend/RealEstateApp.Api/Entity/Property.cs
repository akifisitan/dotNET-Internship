namespace RealEstateApp.Api.Entity
{
    public class Property : BaseEntity
    {
        public PropertyType Type { get; set; }
        public PropertyStatus Status { get; set; }
        public Currency Currency { get; set; }
        public int Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public int TypeId { get; set; }
        public int StatusId { get; set; }
        public int CurrencyId { get; set; }
        public ICollection<PropertyImage> PropertyImages { get; set; }
    }
}
