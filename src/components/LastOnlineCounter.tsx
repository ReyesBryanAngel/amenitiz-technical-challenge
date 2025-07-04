import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { Typography } from '@mui/material';

dayjs.extend(duration);
dayjs.extend(utc);

type LiveCounterProps = {
    lastOnline: number;
};

const LastOnlineCounter = ({ lastOnline }: LiveCounterProps) => {
    const [formattedTime, setFormattedTime] = useState<string>('00:00:00');

    useEffect(() => {
        const updateElapsed = () => {
            const now = dayjs();
            const lastOnlineTime = dayjs.unix(lastOnline).utc();
            const diffInSeconds = now.diff(lastOnlineTime, 'second');
            const hh = String(Math.floor(diffInSeconds / 3600)).padStart(2, '0');
            const mm = String(Math.floor((diffInSeconds % 3600) / 60)).padStart(2, '0');
            const ss = String(diffInSeconds % 60).padStart(2, '0');

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
