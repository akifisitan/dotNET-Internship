using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.Entity.Entity
{
    public class Genre: BaseEntity
    {
        public string Name { get; set; }

        public Genre() 
        { 
            Name = string.Empty; 
        }

        public Genre(string name) { 
            Name = name; 
        }
    }
}
