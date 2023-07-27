using SummerSchool.Entity.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.DataAccess.BaseRepository
{
    public interface IGetRecord<T> where T : BaseEntity
    {
        Task<T?> GetByIdAsync(int id);
    }
}
