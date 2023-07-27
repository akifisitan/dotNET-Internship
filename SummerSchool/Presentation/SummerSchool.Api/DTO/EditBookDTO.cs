using SummerSchool.Entity.Entity;

namespace SummerSchool.Api.DTO
{
    public class EditBookDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime? PublishDate { get; set; }

        public EditBookDTO()
        {

        }

        public EditBookDTO(Book book)
        {
            Id = book.Id;
            Title = book.Title;
            PublishDate = book.PublishDate;
        }

        public Book ToBook()
        {
            return new Book()
            {
                Id = this.Id,
                Title = this.Title,
                PublishDate = this.PublishDate
            };
        }
    }
}
