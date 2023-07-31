using LibraryApp.Api.Entity;
using bdto = LibraryApp.Api.DTO.BaseDto;

namespace LibraryApp.Api.DTO.PublisherDto
{
    public class EditPublisherDto : bdto.BaseDto
    {
        public string Name { get; set; }

        public Publisher ToPublisher()
        {
            return new Publisher()
            {
                Id = this.Id,
                Name = Name,
            };
        }
    }
}
