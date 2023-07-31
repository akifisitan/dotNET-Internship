using System.ComponentModel.DataAnnotations;

namespace LibraryApp.Api.DTO.AuthDto
{
    public class LoginRequestDto
    {
        public string? Username { get; set; }

        public string? Password { get; set; }
    }
}