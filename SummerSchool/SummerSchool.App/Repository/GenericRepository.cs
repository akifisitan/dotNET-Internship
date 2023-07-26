using SummerSchool.App.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.App.Repository
{
    public abstract class GenericRepository<T> where T : BaseEntity
    {
        protected List<T> _list;

        public GenericRepository()
        {
            _list = Seed();
        }

        public List<T> GetAll()
        {
            return _list;
        }

        public T GetById(int id)
        {
            return _list.Single(x => x.Id == id);
        }

        public T Add(T item) 
        {
            item.CreatedAt = DateTime.Now;
            item.Id = _list.Count + 1;
            _list.Add(item);
            return item;
        }

        public T Update(T item)
        {
            item.UpdatedAt = DateTime.Now;
            _list[_list.FindIndex(x => x.Id == item.Id)] = item;
            return item;
        }

        public bool Delete(int id)
        {
            return _list.Remove(_list.SingleOrDefault(x => x.Id == id));
        }

        public abstract List<T> Seed();
    }
}
