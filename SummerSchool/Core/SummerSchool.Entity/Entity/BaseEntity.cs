﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.Entity.Entity
{
    public class BaseEntity
    {
        public int Id { get; set; }
        // public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        // public string UpdatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
