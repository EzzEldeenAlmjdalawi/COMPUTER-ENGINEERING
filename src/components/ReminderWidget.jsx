import React, { useState, useEffect } from 'react';
import { reminders } from '../data/subjects';

export default function ReminderWidget() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * reminders.length));
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % reminders.length);
        setIsFading(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reminder-box">
      <div className="reminder-header">
        <i className="fa-solid fa-book-quran"></i>
        <span>تذكير إيماني</span>
      </div>
      <div 
        id="reminderText" 
        className={`reminder-text ${isFading ? 'fade-out' : 'fade-in'}`}
      >
        {reminders[index]}
      </div>
    </div>
  );
}
