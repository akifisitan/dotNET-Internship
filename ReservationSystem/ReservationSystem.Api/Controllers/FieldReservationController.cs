using AdressBook.Api.DatabaseContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReservationSystem.Api.DTO;
using ReservationSystem.Api.Entity;

namespace ReservationSystem.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FieldReservationController : ControllerBase
    {

        protected readonly FieldReservationContext _context;
        protected readonly DbSet<FieldReservation> _set;

        public FieldReservationController(FieldReservationContext context)
        {
            _context = context;
            _set = context.Set<FieldReservation>();
        }

        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            return Ok(_set.ToList());
        }

        [HttpGet]
        [Route("queryByRange")]
        public IActionResult GetByRange(string startDate, string endDate)
        {
            var response = new GenericResponse<List<ReservationQueryResponseDTO>>();
            if (!DateTime.TryParseExact(startDate, "dd/MM/yyyy",
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out DateTime parsedStartDate) ||
                !DateTime.TryParseExact(endDate, "dd/MM/yyyy",
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out DateTime parsedEndDate))
            {
                response.Message = "Please enter a valid date in dd/MM/yyyy format.";
                return BadRequest(response);
            }
            if (parsedStartDate > parsedEndDate)
            {
                response.Message = "Please make sure the start date is earlier than the end date.";
                return BadRequest(response);
            }
            var queryResult = new List<ReservationQueryResponseDTO>();
            foreach (var reservation in _set.ToList())
            {
                if (parsedStartDate <= reservation.Date && reservation.Date <= parsedEndDate)
                {
                    string formatStartHour = reservation.StartHour > 9 ? reservation.StartHour.ToString() : $"0{reservation.StartHour}";
                    queryResult.Add(new ReservationQueryResponseDTO(
                        reservation.Date.Date.ToShortDateString(),
                        $"{formatStartHour}.00-{reservation.EndHour}.00",
                        reservation.ReserverName,
                        reservation.Id));
                }
            }
            queryResult.Sort();
            response.Message = queryResult.Count == 0 ? "No data found." : "Successfully fetched data.";
            response.Data = queryResult;
            return Ok(response);
        }

        [HttpPost]
        [Route("add")]
        public IActionResult Add([FromBody] ReservationCreateRequestDTO request)
        {
            var response = new GenericResponse<FieldReservation>();
            if (request.Duration > 4 || request.Duration < 1 ||
                request.StartHour < 0 || request.StartHour > 23 ||
                request.ReserverName.IsNullOrEmpty())
            {
                response.Message = "Please check the parameters.";
                return BadRequest(response);
            }
            if (!DateTime.TryParseExact(request.Date, "dd/MM/yyyy",
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out DateTime date))
            {
                response.Message = "Please enter a valid date in dd/MM/yyyy format.";
                return BadRequest(response);
            }
            if (request.StartHour < 9 ||
                request.StartHour + request.Duration > 17 ||
                date.DayOfWeek == DayOfWeek.Saturday ||
                date.DayOfWeek == DayOfWeek.Sunday)
            {
                response.Message = "This date range is outside of working hours.";
                return BadRequest(response);
            }
            foreach (var e in _set.ToList())
            {
                if (date.Equals(e.Date) &&
                    e.IsOverlapping(request.StartHour, request.StartHour + request.Duration))
                {
                    response.Message = "This time slot overlaps with another reservation.";
                    return BadRequest(response);
                }
            }
            var reservation = new FieldReservation()
            {
                Date = date,
                StartHour = request.StartHour,
                EndHour = request.StartHour + request.Duration,
                ReserverName = request.ReserverName
            };
            _set.Add(reservation);
            _context.SaveChanges();
            response.Message = "Reservation Successful.";
            response.Data = reservation;
            return Ok(response);
        }

        [HttpDelete]
        [Route("delete")]
        public IActionResult Delete(int id)
        {
            var existingEntity = _set.SingleOrDefault(x => x.Id == id);
            if (existingEntity == null)
            {
                return NotFound();
            }
            _set.Remove(existingEntity);
            _context.SaveChanges();
            return Ok(existingEntity);
        }
    }
}
