// src/stores/useRouteStore.ts
import { defineStore } from 'pinia';

export const useRouteStore = defineStore('route', {
  state: () => ({
    routeParam: '' as string
  }),
  actions: {
    setRouteParam(param: string) {
      this.routeParam = param;
    }
  }
});