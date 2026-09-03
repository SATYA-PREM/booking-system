import React from 'react';
import { Clock } from 'lucide-react';

const DEFAULT_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '12:00 PM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
  '07:30 PM'
];

const TimeSlots = ({ slots = DEFAULT_SLOTS, selectedTime, onSelectTime, unavailableSlots = [] }) => {
  return (
    <div className="time-slots-wrap">
      <div className="time-slots-grid">
        {slots.map((timeStr) => {
          const isSelected = selectedTime === timeStr;
          const isDisabled = unavailableSlots.includes(timeStr);

          return (
            <button
              key={timeStr}
              type="button"
              className={`time-slot-btn ${isSelected ? 'selected' : ''}`}
              disabled={isDisabled}
              onClick={() => onSelectTime(timeStr)}
              title={isDisabled ? 'Slot already booked' : `Select ${timeStr}`}
            >
              <Clock size={14} style={{ opacity: isSelected ? 1 : 0.6 }} />
              <span>{timeStr}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;

