namespace ReservationSystem.Api.DTO
{
    public class ReservationCreateRequestDTO
    {
        public string Date { get; set; }
        public int StartHour { get; set; }
        public int Duration { get; set; }
        public string ReserverName { get; set; }


        public ReservationCreateRequestDTO(string date, int startHour, int duration, string reserverName)
        {
            Date = date;
            StartHour = startHour;
            Duration = duration;
            ReserverName = reserverName;
        }

    }
}
