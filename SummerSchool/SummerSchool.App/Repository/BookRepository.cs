using SummerSchool.App.Entity;
using SummerSchool.App.Repository;

namespace SummerSchool.App.Database
{
    public class BookRepository : GenericRepository<Book>
    {
        public BookRepository()
        {
            Seed();
        }

        public Book GetByTitle(string title)
        {
            return GetAll().Where(x=>x.Title == title).SingleOrDefault();
        }

        public override List<Book> Seed()
        {
            return new List<Book>()
            {
                new Book(1, "Head First Design Patterns"),
                new Book(2, "Clean Architecture")
            };
        }
    }
}
