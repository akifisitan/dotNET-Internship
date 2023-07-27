using SummerSchool.Entity.Entity;

namespace SummerSchool.Api.DTO
{
    public class BookInfoDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public BookInfoDTO()
        {

        }

        public BookInfoDTO(Book book)
        {
            Id = book.Id;
            Title = book.Title;
        }

        public Book ToBook()
        {
            return new Book()
            {
                Id = this.Id,
                Title = this.Title,
            };
        }
    }
}
