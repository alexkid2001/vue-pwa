import { defineStore } from 'pinia';
// import { ImportMeta } from "vite/hmr"

export type TAlertType = 'success' | 'info' | 'warning' | 'error';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    type: '',
    message: '',
    duration: 2000,
  }),
  actions: {
    setAlert(type: TAlertType, message: string, duration?: number) {
      this.type = type;
      this.message = message;
      setTimeout(() => {
        this.clearAlert();
      }, duration ?? this.$state.duration);
    },
    clearAlert() {
      this.type = '';
      this.message = '';
    },
  },
});

// if ((import.meta as ImportMeta).hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot));
// }
