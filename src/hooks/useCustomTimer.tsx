import { AllTimingsForModelApi, RecordTimerApi } from '@/services/AllMutation/timelogs';
import { useEffect, useState } from 'react';

const useCustomTimer = (ModelId: string) => {
    // const { mutate: RecordTimer } = RecordTimerApi();
    const { data: getAllTimingsForModel, refetch: refetchTimings } = AllTimingsForModelApi(ModelId);

    const [min, setMin] = useState<any>(0);
    const [hour, setHour] = useState<any>(0);
    const [sec, setSec] = useState(0);
    const [isLate, setIsLate] = useState(false);
    const [date, setDate] = useState();

    const cDown = () => {
        if (!date) return;
        const target = new Date(date);
        const now = new Date();

        if (getAllTimingsForModel?.data && getAllTimingsForModel?.data?.length > 0) {
            const last = getAllTimingsForModel?.data[getAllTimingsForModel?.data?.length - 1];
            if (last?.action === 'pause') {
                const seclast = new Date(getAllTimingsForModel?.data[getAllTimingsForModel?.data?.length - 2]?.timestamps);
                setIsLate(true);
                const difference = target.getTime() - seclast.getTime();
                let seconds = Math.floor(difference / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);
                let day = Math.floor(hours / 24);
                hours %= 24;
                minutes %= 60;
                seconds %= 60;

                setHour(hours);
                setMin(minutes);
                setSec(seconds);
                return;
            }
        }

        setIsLate(true);
        const difference = now.getTime() - target.getTime();
        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let day = Math.floor(hours / 24);
        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        setHour(hours);
        setMin(minutes);
        setSec(seconds);
    };

    useEffect(() => {
        const interval = setInterval(() => cDown(), 1000);
        return () => clearInterval(interval);
    }, [date]);

    useEffect(() => {
        if (getAllTimingsForModel?.data && getAllTimingsForModel?.data?.length > 0) {
            const last = getAllTimingsForModel?.data[getAllTimingsForModel?.data?.length - 1];
            if (last?.action === 'start' || last?.action === 'pause') {
                setDate(last?.timestamps);
            }
        }
    }, [getAllTimingsForModel?.data]);

    const getTimeWorked = (d: number) => {
        if (!d && d === 0) {
            return '00:00';
        }
        const difference = d;
        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let day = Math.floor(hours / 24);
        hours %= 24;
        minutes %= 60;
        seconds %= 60;
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return { min, hour, sec, isLate, date };
};

export default useCustomTimer;
