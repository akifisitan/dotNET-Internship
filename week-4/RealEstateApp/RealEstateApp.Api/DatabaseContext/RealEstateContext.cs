using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DatabaseContext
{
    public class RealEstateContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public RealEstateContext(DbContextOptions<RealEstateContext> opt) : base(opt)
        {

        }
    }
}
