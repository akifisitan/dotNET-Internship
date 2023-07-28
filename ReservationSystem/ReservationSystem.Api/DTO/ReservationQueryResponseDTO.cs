namespace ReservationSystem.Api.DTO
{
    public class ReservationQueryResponseDTO : IComparable<ReservationQueryResponseDTO>
    {
        public string ReservationDate { get; set; }
        public string TimeSlot { get; set; }
        public string ReservedBy { get; set; }
        public int ReservationId { get; set; }

        public ReservationQueryResponseDTO(string reservationDate, string timeSlot, string reservedBy, int reservationId)
        {
            ReservationDate = reservationDate;
            TimeSlot = timeSlot;
            ReservedBy = reservedBy;
            ReservationId = reservationId;
        }

        public int CompareTo(ReservationQueryResponseDTO? other)
        {
            if (other == null)
                return 0;
            int dateComparison = ReservationDate.CompareTo(other.ReservationDate);
            if (dateComparison == 0)
            {
                return TimeSlot.CompareTo(other.TimeSlot);
            }
            return dateComparison;
        }
    }
}
