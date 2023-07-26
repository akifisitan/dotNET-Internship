using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.App.Entity
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }

        public Book()
        {

        }

        public Book(int id, string title)
        {
            Id = id;
            Title = title;
        }
    }
}
