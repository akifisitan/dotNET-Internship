using ef = Microsoft.EntityFrameworkCore;
using SummerSchool.Entity.Entity;
using SummerSchool.DataAccess.MsSql.DbContext;
using Microsoft.EntityFrameworkCore;

namespace SummerSchool.DataAccess.MsSql.Repository
{
    public class GenericRepository<T> where T : BaseEntity
    {
        protected readonly SummerSchoolDbContext _context;
        protected readonly DbSet<T> _set;

        public GenericRepository(SummerSchoolDbContext context)
        {
            _context = context;
            _set = _context.Set<T>();
        }

        public List<T> GetAll()
        {
            return _set.ToList();
        }

        public T? GetById(int id)
        {
            return _set.SingleOrDefault(x => x.Id == id);
        }

        public T Add(T item)
        {
            _set.Add(item);
            _context.SaveChanges();
            return item;
        }
        public T Update(T item)
        {
            _set.Update(item);
            _context.SaveChanges();
            return item;
        }

        public bool Delete(int id)
        {
            var entity = GetById(id);
            if (entity != null)
            {
                _set.Remove(entity);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
