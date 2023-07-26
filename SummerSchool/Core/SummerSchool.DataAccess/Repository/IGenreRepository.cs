using SummerSchool.DataAccess.BaseRepository;
using SummerSchool.Entity.Entity;

namespace SummerSchool.DataAccess.Repository
{
    public interface IGenreRepository : IGetRecord<Genre>, IGetAllRecord<Genre>, 
        IAddRecord<Genre>, IUpdateRecord<Genre>, IDeleteRecord
    {
        Genre? GetByName(string name);
    }

}
