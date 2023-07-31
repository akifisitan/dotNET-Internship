using SummerSchool.Entity.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.DataAccess.BaseRepository
{
    public interface IGetAllRecord<T> where T : BaseEntity
    {
        Task<List<T>> GetAllAsync();
    }
}
