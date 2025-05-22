import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useDefaultStore = defineStore("User", {
  state: () => ({
    isLogged: false,
    role: null,
  }),
  actions: {
    toggleLogin() {
      this.isLogged = !this.isLogged;
    },
    setLogout() {
      this.isLogged = false;
      toast.success("You have successfully logged out!");
    },
    setRole(role) {
      this.role = role;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "default-store",
        storage: localStorage,
      },
    ],
  },
});
