using Microsoft.EntityFrameworkCore;
using ReservationSystem.Api.Entity;

namespace AdressBook.Api.DatabaseContext
{
    public class FieldReservationContext : DbContext
    {
        public DbSet<FieldReservation> FieldReservations { get; set; }

        public FieldReservationContext(DbContextOptions options) : base(options)
        { }

    }
}
