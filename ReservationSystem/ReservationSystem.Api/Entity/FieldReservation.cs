namespace ReservationSystem.Api.Entity
{
    public class FieldReservation : BaseEntity, IComparable<FieldReservation>
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

        public int CompareTo(FieldReservation? other)
        {
            if (other == null)
                return 0;
            int dateComparison = Date.CompareTo(other.Date);
            if (dateComparison == 0)
            {
                return StartHour.CompareTo(other.StartHour);
            }
            return dateComparison;
        }

        public override string ToString()
        {
            return $"Reservation for: {ReserverName} between {StartHour}-{EndHour} at {Date.Date.ToShortDateString()}.";
        }
    }
}
