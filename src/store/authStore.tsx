import { create, GetState, SetState } from "zustand";
import { persist } from "zustand/middleware";

// Agregar 'department' al tipo User
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  loginType: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  profilePicture: string;
  loginId: string;
  accountType: string;
  credits: number;
  questionAsked: number;
  username: string;
  whom: string;
  standard: string;
  department: string;  // <-- Añadir el campo department aquí
};

type AuthState = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  loggedIn: boolean;
  authLoading: boolean;
  currentAction: string;
};

const useAuthStore = create<AuthState>()(
  persist((set: SetState<AuthState>, get: GetState<AuthState>) => ({
    user: null,
    loggedIn: false,
    authLoading: false,
    currentAction: 'home',
    signIn: (user) =>
      set((state) => ({
        ...state,
        user,
        loggedIn: true,
      })),
    action: (st: any) =>
      set((state) => ({
        ...state,
        currentAction: st
      })),
    signOut: () =>
      set((state) => ({
        ...state,
        loggedIn: false,
        user: null,
      })),
    auth: () =>
      set((state) => ({
        ...state,
        loggedIn: false,
        user: null,
      })),
  }), { name: "user" })
);

export default useAuthStore;

