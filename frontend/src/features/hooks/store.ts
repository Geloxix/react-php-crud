import { create } from "zustand";
//types
import { UserTypes } from "@/constants/types";

//customize axxios
import axios from "@/api/axios";

interface UsefetchUserStoreProps {
    errorMsg?: string;
    users: UserTypes[];
    fetchUsers: () => void;
}

export const usefetchUserStore = create<UsefetchUserStoreProps>((set) => ({
    users: [],
    fetchUsers: async () => {
        try {
            const response = await axios.get('/index.php');
            set({ users: response.data.users });
        } catch (error: any) {
            if (error.response) {
                set({ errorMsg: error.response.data.message});
            } else {
                set({ errorMsg: 'An error occured during the request!'});
            }
        }
    }
}));