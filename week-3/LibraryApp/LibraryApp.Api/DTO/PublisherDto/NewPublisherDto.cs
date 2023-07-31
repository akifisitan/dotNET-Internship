using LibraryApp.Api.Entity;

namespace LibraryApp.Api.DTO.PublisherDto
{
    public class NewPublisherDto
    {
        public string Name { get; set; }

        public Publisher ToPublisher()
        {
            return new Publisher()
            {
                Id = 0,
                Name = Name,
            };
        }
    }
}

