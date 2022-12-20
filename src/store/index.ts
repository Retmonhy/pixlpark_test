import { AppStore } from './app';

class Store {
  app: AppStore;
  constructor() {
    this.app = new AppStore();
  }
}
export default new Store();
