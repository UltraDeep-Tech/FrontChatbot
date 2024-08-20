import { create, GetState, SetState } from "zustand";


type detailsState = {
  details: boolean;
  setDetails: () => void;
  clearDetails: () => void;
};

const userDetailsExist = create<detailsState>()(
  (set: SetState<detailsState>) =>
  ({
    details: true,
    setDetails: () =>
      set(() => ({
        details: true
      })),
    clearDetails: () =>
      set(() => ({
        details: false,
      })),
  })
)

export default userDetailsExist;



