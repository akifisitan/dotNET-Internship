using GalleryApp.Api.Entity;
using Microsoft.EntityFrameworkCore;

namespace GalleryApp.Api.DatabaseContext
{
    public class CarContext : DbContext
    {

        public DbSet<Car> Cars { get; set; }
        public DbSet<Base64Photo> Base64Photos { get; set; }
        public DbSet<BytePhoto> BytePhotos { get; set; }

        public CarContext(DbContextOptions<CarContext> options) : base(options)
        { }

    }
}
