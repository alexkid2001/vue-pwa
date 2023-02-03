import { acceptHMRUpdate, defineStore } from 'pinia';

type TAlertType = 'success' | 'info' | 'warning' | 'error'
type TAlertStore = {
  type: TAlertType,
  message: string
}
export const useAlertStore = defineStore<TAlertStore>('alert', {
  id: 'alert',
  state: () => ({
    type: '',
    message: '',
  }),
  actions: {
    setAlert(alert: TAlertStore) {
      this.type = alert.type;
      this.message = alert.message;
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot))
}
