using Microsoft.IdentityModel.Tokens;

namespace AdressBook.Api.DAO
{
    public class AddAddressDAO
    {
        public string Name { get; set; }
        public string Il { get; set; }
        public string Ilce { get; set; }
        public string Mahalle { get; set; }
        public string Cadde { get; set; }
        public string TelefonNumarasi { get; set; }

        public AddAddressDAO(string name, string il, string ilce, string mahalle, string cadde, string telefonNumarasi)
        {
            Name = name;
            Il = il;
            Ilce = ilce;
            Mahalle = mahalle;
            Cadde = cadde;
            TelefonNumarasi = telefonNumarasi;
        }

        public bool MissingFields()
        {
            return
                Name.IsNullOrEmpty() || Il.IsNullOrEmpty() ||
                Ilce.IsNullOrEmpty() || Mahalle.IsNullOrEmpty() ||
                Cadde.IsNullOrEmpty() || TelefonNumarasi.IsNullOrEmpty();
        }
    }
}
