using LibraryApp.Api.Entity;
using bdto = LibraryApp.Api.DTO.BaseDto;

namespace LibraryApp.Api.DTO.StudentDto
{
    public class EditStudentDto : bdto.BaseDto
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public Student ToStudent()
        {
            return new Student()
            {
                Id = this.Id,
                Name = this.Name,
                Email = this.Email
            };
        }
    }
}