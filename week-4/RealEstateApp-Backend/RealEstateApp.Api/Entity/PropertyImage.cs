namespace RealEstateApp.Api.Entity
{
    public class PropertyImage : PropertyFieldBase
    {
        public int PropertyId { get; set; }
        // [JsonIgnore] // Add this attribute to prevent circular serialization
        public Property Property { get; set; }

        public PropertyImage() { }
        public PropertyImage(string image, int propertyId)
        {
            Value = image;
            PropertyId = propertyId;
        }
    }
}
