using ef = Microsoft.EntityFrameworkCore;
using SummerSchool.DataAccess.Repository;
using SummerSchool.Entity.Entity;
using SummerSchool.DataAccess.MsSql.DbContext;
using Microsoft.EntityFrameworkCore;

namespace SummerSchool.DataAccess.MsSql.Repository
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(SummerSchoolDbContext _context) : base(_context)
        {
            
        }

        public async Task<Book?> GetByTitleAsync(string title)
        {
            var book = await _set.FirstOrDefaultAsync(x => x.Title == title);
            if(book != null)
            { 
                _context.Entry(book).State = EntityState.Detached;
            }
            return book;
        }
    }
}
