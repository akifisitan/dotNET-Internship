using ef = Microsoft.EntityFrameworkCore;
using SummerSchool.DataAccess.Repository;
using SummerSchool.Entity.Entity;
using SummerSchool.DataAccess.MsSql.DbContext;

namespace SummerSchool.DataAccess.MsSql.Repository
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(SummerSchoolDbContext _context) : base(_context)
        {
            
        }

        public Book? GetByTitle(string title)
        {
            return _set.FirstOrDefault(x=>x.Title == title);
        }
    }
}
