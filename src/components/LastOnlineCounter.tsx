import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Typography } from '@mui/material';

dayjs.extend(duration);

type LiveCounterProps = {
  lastOnline: number;
};

const LastOnlineCounter = ({ lastOnline }: LiveCounterProps) => {
  const [formattedTime, setFormattedTime] = useState<string>('00:00:00');

  useEffect(() => {
    const updateElapsed = () => {
      const now = dayjs();
      const lastOnlineTime = dayjs.unix(lastOnline);
      const diffInSeconds = now.diff(lastOnlineTime, 'second');

      const durationObj = dayjs.duration(diffInSeconds, 'seconds');
      const hh = String(durationObj.hours()).padStart(2, '0');
      const mm = String(durationObj.minutes()).padStart(2, '0');
      const ss = String(durationObj.seconds()).padStart(2, '0');

      setFormattedTime(`${hh}:${mm}:${ss}`);
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);

    return () => clearInterval(interval);
  }, [lastOnline]);

  return (
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      Last online: {formattedTime} ago
    </Typography>
  );
};

export default LastOnlineCounter;
