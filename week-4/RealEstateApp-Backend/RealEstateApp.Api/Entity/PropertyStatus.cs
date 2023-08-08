namespace RealEstateApp.Api.Entity
{
    public class PropertyStatus : PropertyFieldBase
    {
        public PropertyStatus() { }
        public PropertyStatus(string status)
        {
            base.Value = status;
        }
    }
}
