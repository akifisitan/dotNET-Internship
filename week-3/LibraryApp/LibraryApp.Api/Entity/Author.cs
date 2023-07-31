using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LibraryApp.Api.Entity
{
    public class Author : BaseEntity
    {
        public string Name { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}
