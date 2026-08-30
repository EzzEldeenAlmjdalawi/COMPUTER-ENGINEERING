import React, { useState, useEffect } from 'react';

export default function PrayerWidget() {
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let timerId = null;

    async function fetchPrayerTimes() {
      try {
        const response = await fetch(
          'https://api.aladhan.com/v1/timingsByCity?city=Gaza&country=Palestine&method=5'
        );
        const data = await response.json();
        const timings = data.data.timings;

        const prayers = [
          { name: 'الفجر', key: 'fajr', time: timings.Fajr, icon: 'fa-solid fa-sun' },
          { name: 'الظهر', key: 'dhuhr', time: timings.Dhuhr, icon: 'fa-solid fa-sun' },
          { name: 'العصر', key: 'asr', time: timings.Asr, icon: 'fa-solid fa-cloud-sun' },
          { name: 'المغرب', key: 'maghrib', time: timings.Maghrib, icon: 'fa-solid fa-moon' },
          { name: 'العشاء', key: 'isha', time: timings.Isha, icon: 'fa-solid fa-star' },
        ];

        const now = new Date();
        let targetPrayer = null;

        for (let p of prayers) {
          const cleanTime = p.time.split(' ')[0];
          const [hours, minutes] = cleanTime.split(':');
          let pDate = new Date();
          pDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
          if (pDate > now) {
            targetPrayer = { ...p, prayerDate: pDate };
            break;
          }
        }

        if (!targetPrayer) {
          // Next day Fajr
          const cleanTime = prayers[0].time.split(' ')[0];
          const [hours, minutes] = cleanTime.split(':');
          let pDate = new Date();
          pDate.setDate(pDate.getDate() + 1);
          pDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
          targetPrayer = { ...prayers[0], prayerDate: pDate };
        }

        const formattedTime = targetPrayer.prayerDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        setNextPrayer({ ...targetPrayer, formattedTime });

        // Update countdown every second
        timerId = setInterval(() => {
          const current = new Date();
          const diff = targetPrayer.prayerDate - current;

          if (diff <= 0) {
            fetchPrayerTimes(); // Refresh for next prayer
            return;
          }

          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);

          setCountdown(`⏳ متبقي ${h}س ${m}د ${s}ث`);
        }, 1000);
      } catch (err) {
        console.error('Prayer fetch error:', err);
        setError(true);
      }
    }

    fetchPrayerTimes();

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []);

  return (
    <div className="prayer-box">
      <div className="prayer-header">
        <i className="fa-solid fa-mosque"></i>
        <span>الصلاة القادمة - غزة 🇵🇸</span>
      </div>
      {error ? (
        <div className="prayer-name">تعذر جلب المواقيت حالياً</div>
      ) : nextPrayer ? (
        <>
          <div className="prayer-name">
            <i className={nextPrayer.icon}></i>
            <span className={nextPrayer.key}>{nextPrayer.name}</span>
          </div>
          <div id="nextPrayerTime" className="prayer-time-val">{nextPrayer.formattedTime}</div>
          <div id="countdown" className="prayer-countdown-val">{countdown}</div>
        </>
      ) : (
        <div className="prayer-loading">جاري حساب موعد الصلاة...</div>
      )}
    </div>
  );
}
