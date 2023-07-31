namespace AdressBook.Api.Entity
{
    public class Address : BaseEntity
    {
        public string Name { get; set; }
        public string Il { get; set; }
        public string Ilce { get; set; }
        public string Mahalle { get; set; }
        public string Cadde { get; set; }
        public string TelefonNumarasi { get; set; }
        public Address()
        {
            Name = string.Empty;
            Il = string.Empty;
            Ilce = string.Empty;
            Mahalle = string.Empty;
            Cadde = string.Empty;
            TelefonNumarasi = string.Empty;
        }

        public Address(string name, string il, string ilce, string mahalle, string cadde, string telefonNumarasi)
        {
            Name = name;
            Il = il;
            Ilce = ilce;
            Mahalle = mahalle;
            Cadde = cadde;
            TelefonNumarasi = telefonNumarasi;
        }
    }
}