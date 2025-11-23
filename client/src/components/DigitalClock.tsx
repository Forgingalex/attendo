import { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(time);
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const displayHours = time.getHours() % 12 || 12;

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-attendo-secondary px-4 py-2 rounded-xl">
        <div className="text-2xl font-mono font-bold text-attendo-primary">
          {displayHours.toString().padStart(2, '0')} : {minutes} : {seconds}
        </div>
        <div className="text-xs text-gray-500 text-center mt-1">{ampm}</div>
      </div>
    </div>
  );
};

export default DigitalClock;


