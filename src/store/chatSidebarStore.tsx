import { create } from 'zustand';

interface StoreState {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
}

const useChatSideBarStore = create<StoreState>((set) => ({
  showSideBar: false,
  setShowSideBar: (value) => set({ showSideBar: value }),
}));

export default useChatSideBarStore;
