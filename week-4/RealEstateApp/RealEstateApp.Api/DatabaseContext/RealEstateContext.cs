﻿using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DatabaseContext
{
    public class RealEstateContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<PropertyImage> PropertyImages { get; set; }
        public RealEstateContext(DbContextOptions<RealEstateContext> opt) : base(opt)
        {

        }
    }
}
