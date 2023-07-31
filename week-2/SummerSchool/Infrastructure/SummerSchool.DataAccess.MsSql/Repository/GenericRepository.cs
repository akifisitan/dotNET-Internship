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
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            _set = _context.Set<T>();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _set.AsNoTracking().ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            var entity = await _set.SingleOrDefaultAsync(x => x.Id == id);
            //if(entity != null) 
            //{ 
            //    _context.Entry(entity).State = EntityState.Detached;
            //}
            return entity;
        }

        public async Task<T> AddAsync(T item)
        {
            item.CreatedAt = DateTime.Now;

            _context.Entry(item).State = EntityState.Added;
            //_set.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }
        public async Task<T> UpdateAsync(T item)
        {
            item.UpdatedAt = DateTime.Now;

            _context.Entry(item).State = EntityState.Modified;
            //_set.Update(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _set.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
