using LibraryApp.Api.Entity;
using bdto = LibraryApp.Api.DTO.BaseDto;

namespace LibraryApp.Api.DTO.AuthorDto
{
    public class EditAuthorDto : bdto.BaseDto
    {
        public string Name { get; set; }

        public EditAuthorDto()
        {
        }

        public Author ToAuthor()
        {
            return new Author()
            {
                Id = this.Id,
                Name = this.Name,
            };
        }
    }
}
