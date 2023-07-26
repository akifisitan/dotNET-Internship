using SummerSchool.DataAccess.MsSql.DbContext;
using SummerSchool.DataAccess.Repository;
using SummerSchool.Entity.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.DataAccess.MsSql.Repository
{
    public class GenreRepository : GenericRepository<Genre>, IGenreRepository
    {
        public GenreRepository(SummerSchoolDbContext _context) : base(_context)
        {

        }

        public Genre? GetByName(string name)
        {
            return _set.FirstOrDefault(x => x.Name == name);
        }
    }
}
