using LibraryApp.Api.Entity;
using bdto = LibraryApp.Api.DTO.BaseDto;

namespace LibraryApp.Api.DTO.StudentDto
{
    public class NewStudentDto
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public Student ToStudent()
        {
            return new Student()
            {
                Id = 0,
                Name = this.Name,
                Email = this.Email
            };
        }
    }
}