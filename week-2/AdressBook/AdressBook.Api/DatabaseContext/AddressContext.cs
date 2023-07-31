using AdressBook.Api.Entity;
using Microsoft.EntityFrameworkCore;

namespace AdressBook.Api.DatabaseContext
{
    public class AddressContext : DbContext
    {
        public DbSet<Address> Adresses { get; set; }

        public AddressContext(DbContextOptions options) : base(options)
        { }

    }
}
