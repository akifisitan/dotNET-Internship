using LibraryApp.Api.Entity;
using bdto = LibraryApp.Api.DTO.BaseDto;

namespace LibraryApp.Api.DTO.GenreDto
{
    public class EditGenreDto : bdto.BaseDto
    {
        public string Name { get; set; }

        public Genre ToGenre()
        {
            return new Genre()
            {
                Id = this.Id,
                Name = this.Name,
            };
        }
    }
}
