namespace RealEstateApp.Api.Entity
{
    public class PropertyType : PropertyFieldBase
    {
        public PropertyType() { }
        public PropertyType(string type)
        {
            base.Value = type;
        }
    }
}
