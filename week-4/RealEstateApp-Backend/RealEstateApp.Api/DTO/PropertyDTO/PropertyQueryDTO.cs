using RealEstateApp.Api.DTO.PropertyFieldDTO;
using RealEstateApp.Api.DTO.UserDTO;
using RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.PropertyDTO
{
    public class PropertyQueryDTO
    {
        public int Id { get; set; }
        public PropertyFieldInfoDTO<Currency> Currency { get; set; }
        public PropertyFieldInfoDTO<PropertyStatus> Status { get; set; }
        public PropertyFieldInfoDTO<PropertyType> Type { get; set; }
        public List<PropertyFieldInfoDTO<PropertyImage>> Images { get; set; }
        public UserInfoDTO User { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }


    }
}
