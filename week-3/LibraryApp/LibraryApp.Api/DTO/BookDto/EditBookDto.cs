using LibraryApp.Api.Entity;
using bdto = LibraryApp.Api.DTO.BaseDto;

namespace LibraryApp.Api.DTO.BookDto
{
    public class EditBookDto : bdto.BaseDto
    {
        public string Title { get; set; }
        public DateTime PublishDate { get; set; }

        public int AuthorId { get; set; }
        public int GenreId { get; set; }
        public int PublisherId { get; set; }

        public EditBookDto()
        {
        }

        public Book ToBook()
        {
            return new Book()
            {
                Id = 0,
                Title = this.Title,
                PublishDate = this.PublishDate,
                AuthorId = this.AuthorId,
                GenreId = this.GenreId,
                PublisherId = this.PublisherId
            };
        }
    }
}
