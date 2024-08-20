import { create } from "zustand";
import { persist } from "zustand/middleware";

type userFreeTrail = {
  count: number;
  interval: number,
  numberChangeCount: number;
  question: number;
  startTime: Date;
  decrementCount: () => void;
  updateInterval: (newInterval: number) => void;
  setquestion: () => void;
  reset: () => void;
};
// Math.floor(Math.random() * (max - min) + min);
const userFreeTrailStore = create<userFreeTrail>()(
  persist(
    (set, get) => ({
      count: Math.floor(Math.random() * (300 - 201) + 201),
      question: Math.floor(Math.random() * (10000 - 9000) + 9000),
      startTime: new Date(),
      interval: 3000,
      numberChangeCount: 0,
      decrementCount: () => set((state) => ({ count: state.count - 1 })),
      updateInterval: (newInterval) => set({ interval: newInterval }),
      setquestion: () => set((state) => ({ question: state.question + 1 })),
      reset: () => {
        let count = Math.floor(Math.random() * (300 - 201) + 201)
        let question = Math.floor(Math.random() * (10000 - 9000) + 9000)
        let startTime = new Date()
        let interval = 3000
        let numberChangeCount = 0
        set((state) => ({
          ...state,
          count: count,
          interval: interval,
          numberChangeCount: numberChangeCount,
          question: question,
          startTime: startTime,
        }));
      },
    }),
    { name: "userFreeTrailStore" }
  )
);

export default userFreeTrailStore;
