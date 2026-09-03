import React from 'react';
import { Calendar } from 'lucide-react';

const DatePicker = ({ selectedDate, onSelectDate, disabledDates = [] }) => {
  // Generate next 14 selectable dates starting from tomorrow or today
  const dates = React.useMemo(() => {
    const list = [];
    const base = new Date();
    // Default start from tomorrow if late evening, or today
    const startDay = base.getHours() >= 20 ? 1 : 0;

    for (let i = startDay; i < startDay + 12; i++) {
      const d = new Date();
      d.setDate(base.getDate() + i);

      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const fullFormatted = d.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const isoKey = d.toISOString().slice(0, 10);

      list.push({
        id: isoKey,
        dayName,
        dayNum,
        monthName,
        fullFormatted,
        isWeekend: d.getDay() === 0 || d.getDay() === 6
      });
    }
    return list;
  }, []);

  return (
    <div className="date-picker-wrap">
      <div className="date-picker-grid">
        {dates.map((item) => {
          const isSelected = selectedDate === item.fullFormatted;
          const isDisabled = disabledDates.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              className={`date-pill ${isSelected ? 'selected' : ''}`}
              disabled={isDisabled}
              onClick={() => onSelectDate(item.fullFormatted, item.id)}
              aria-label={`Select ${item.fullFormatted}`}
            >
              <span className="date-day-name">{item.dayName}</span>
              <span className="date-day-number">{item.dayNum}</span>
              <span className="date-month-name">{item.monthName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;

