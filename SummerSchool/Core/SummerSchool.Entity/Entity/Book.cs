﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.Entity.Entity
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }

        public Book()
        {
            Title = string.Empty;
        }

        public Book(int id, string title)
        {
            Id = id;
            Title = title;
        }
    }
}
