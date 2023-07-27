using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.DataAccess.BaseRepository
{
    internal interface ISaveChanges
    {
        Task<int> SaveChangesAsync();
    }
}
