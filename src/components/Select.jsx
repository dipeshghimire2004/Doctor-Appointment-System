import React, { forwardRef } from 'react';

const TimeSlotPicker = forwardRef(({ label, onChange, value }, ref) => {
  const generateTimeSlots = () => {
    const slots = [];
    let current = new Date();
    current.setMinutes(0);
    current.setSeconds(0);
    current.setMilliseconds(0);

    for (let i = 0; i < 24 * 2; i++) {  // 24 hours * 2 (for 30-minute intervals)
      slots.push(current.toTimeString().substring(0, 5));
      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  };

  return (
    <div className="relative">
      <label className="block text-gray-700 mb-2">{label}</label>
      <select
        ref={ref}  // Use the ref here if needed
        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option value="" disabled>Select time slot</option>
        {generateTimeSlots().map(slot => (
          <option key={slot} value={slot}>{slot}</option>
        ))}
      </select>
    </div>
  );
});

export default TimeSlotPicker;
