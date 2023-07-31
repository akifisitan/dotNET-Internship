namespace ReservationSystem.Api.Entity
{
    public class FieldReservation : BaseEntity
    {
        public DateTime Date { get; set; }
        public int StartHour { get; set; }
        public int EndHour { get; set; }
        public string ReserverName { get; set; }

        public FieldReservation()
        {
            ReserverName = string.Empty;
        }

        public FieldReservation(DateTime date, int startHour, int endHour, string reserverName)
        {
            Date = date;
            StartHour = startHour;
            EndHour = endHour;
            ReserverName = reserverName;
        }

        public bool IsOverlapping(int compareStartHour, int compareEndHour)
        {
            return !(compareStartHour >= EndHour || compareEndHour <= StartHour);
        }

    }
}
