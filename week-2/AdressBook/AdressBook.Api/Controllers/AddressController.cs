using AdressBook.Api.DAO;
using AdressBook.Api.DatabaseContext;
using AdressBook.Api.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AdressBook.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddressController : ControllerBase
    {
        protected readonly AddressContext _context;
        protected readonly DbSet<Address> _set;

        public AddressController(AddressContext context)
        {
            _context = context;
            _set = context.Set<Address>();
        }

        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            return Ok(_set.ToList());
        }

        [HttpGet]
        [Route("getById")]
        public IActionResult Get(int id)
        {
            var foundElement = _set.SingleOrDefault(x => x.Id == id);
            if (foundElement != null)
            {
                return Ok(foundElement);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("queryByName")]
        public IActionResult GetByName(string query)
        {
            query = query.ToLower();
            var responseList = new List<Address>();
            foreach (var entity in _set.ToList())
            {
                if (entity.Name.ToLower().StartsWith(query))
                {
                    responseList.Add(entity);
                }
            }
            return Ok(responseList);
        }

        [HttpGet]
        [Route("queryByParameters")]
        public IActionResult GetByParams(string query)
        {
            query = query.ToLower();
            var responseList = new List<Address>();
            foreach (var entity in _set.ToList())
            {
                if (entity.Il.ToLower().StartsWith(query) ||
                    entity.Ilce.ToLower().StartsWith(query) ||
                    entity.Mahalle.ToLower().StartsWith(query) ||
                    entity.Cadde.ToLower().StartsWith(query))
                {
                    responseList.Add(entity);
                }
            }
            return Ok(responseList);
        }

        [HttpPost]
        [Route("add")]
        public IActionResult Post([FromBody] AddAddressDAO request)
        {
            if (request.MissingFields())
            {
                return BadRequest(request);
            }
            var newAddress = new Address()
            {
                Name = request.Name,
                Il = request.Il,
                Ilce = request.Ilce,
                Mahalle = request.Mahalle,
                Cadde = request.Cadde,
                TelefonNumarasi = request.TelefonNumarasi
            };
            _set.Add(newAddress);
            _context.SaveChanges();
            return Ok(newAddress);
        }

        [HttpPut]
        [Route("update")]
        public IActionResult Put([FromBody] Address address)
        {
            var existingEntity = _set.SingleOrDefault(x => x.Id == address.Id);
            if (existingEntity == null)
            {
                return NotFound();
            }
            int counter = 0;
            if (!address.Name.IsNullOrEmpty())
            {
                existingEntity.Name = address.Name;
                counter++;
            }
            if (!address.Il.IsNullOrEmpty())
            {
                existingEntity.Il = address.Il.ToLower();
                counter++;
            }
            if (!address.Mahalle.IsNullOrEmpty())
            {
                existingEntity.Mahalle = address.Mahalle.ToLower();
                counter++;
            }
            if (!address.Cadde.IsNullOrEmpty())
            {
                existingEntity.Cadde = address.Cadde.ToLower();
                counter++;
            }
            if (!address.TelefonNumarasi.IsNullOrEmpty())
            {
                existingEntity.TelefonNumarasi = address.TelefonNumarasi;
                counter++;
            }
            if (counter != 0)
            {
                _set.Update(existingEntity);
                _context.SaveChanges();
                return Ok(existingEntity);
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("delete")]
        public IActionResult Delete(int id)
        {
            var existingEntity = _set.SingleOrDefault(x => x.Id == id);
            if (existingEntity != null)
            {
                _set.Remove(existingEntity);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }

    }
}
