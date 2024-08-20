import { create } from 'zustand';

interface StoreState {
    isHovered: boolean;
    setIsHovered: (value: boolean) => void;
}

const useChatSideBarHoverStore = create<StoreState>((set) => ({
    isHovered: false,
    setIsHovered: (value) => set({ isHovered: value }),
}));

export default useChatSideBarHoverStore;