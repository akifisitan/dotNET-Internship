using SummerSchool.DataAccess.BaseRepository;
using SummerSchool.Entity.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.DataAccess.Repository
{
    internal interface IUserRepository : IGetRecord<Book>, IGetAllRecord<Book>, IAddRecord<Book>, IUpdateRecord<Book>, IDeleteRecord
    {
    }
}
