using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.Entity.Entity
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public DateTime PublishDate { get; set; } 

        public Book()
        {
            Title = string.Empty;
            Author = string.Empty;
            Publisher = string.Empty;
        }

        public Book(int id, string title)
        {
            Id = id;
            Title = title;
            Author = string.Empty;
            Publisher = string.Empty;
        }

        public Book(string title, string author, string publisher, DateTime publishDate)
        {
            Title = title;
            Author = author;
            Publisher = publisher;
            PublishDate = publishDate;
        }
    }
}
