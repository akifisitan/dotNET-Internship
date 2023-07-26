using SummerSchool.DataAccess.Repository;
using SummerSchool.Entity.Entity;

namespace SummerSchool.DataAccess.InMemoryList.Repository
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository()
        {
        }

        public Book? GetByTitle(string title)
        {
            return GetAll()?.Where(x=> x.Title == title).SingleOrDefault();
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
