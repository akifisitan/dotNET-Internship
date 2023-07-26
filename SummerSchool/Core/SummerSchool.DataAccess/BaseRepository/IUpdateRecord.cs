using SummerSchool.Entity.Entity;

namespace SummerSchool.DataAccess.BaseRepository
{
    public interface IUpdateRecord<T> where T : BaseEntity
    {
        T Update(T item);
    }
}
