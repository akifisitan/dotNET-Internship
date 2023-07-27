using SummerSchool.Entity.Entity;

namespace SummerSchool.Api.DTO
{
    public class NewBookDTO
    {
        public string Title { get; set; }
        public DateTime? PublishDate { get; set; }

        public NewBookDTO()
        {

        }

        public NewBookDTO(Book book)
        {
            Title = book.Title;
            PublishDate = book.PublishDate;
        }

        public Book ToBook()
        {
            return new Book()
            {
                Id = 0,
                Title = this.Title,
                PublishDate = this.PublishDate
            };
        }
    }
}
