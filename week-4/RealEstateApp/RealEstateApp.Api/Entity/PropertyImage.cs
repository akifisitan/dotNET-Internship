namespace RealEstateApp.Api.Entity
{
    public class PropertyImage : BaseEntity
    {
        public string ImageUrl { get; set; }
        public int PropertyId { get; set; }
        public Property Property { get; set; }
    }
}
