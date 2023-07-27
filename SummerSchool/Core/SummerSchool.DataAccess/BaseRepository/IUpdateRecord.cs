using SummerSchool.Entity.Entity;

namespace SummerSchool.DataAccess.BaseRepository
{
    public interface IUpdateRecord<T> where T : BaseEntity
    {
        Task<T> UpdateAsync(T item);
    }
}
