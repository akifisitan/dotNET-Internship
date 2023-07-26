using SummerSchool.DataAccess.BaseRepository;
using SummerSchool.Entity.Entity;

namespace SummerSchool.DataAccess.Repository
{
    public interface IBookRepository : IGetRecord<Book>, IGetAllRecord<Book>, IAddRecord<Book>, IUpdateRecord<Book>, IDeleteRecord
    {
        Book? GetByTitle(string title);
    }
}
