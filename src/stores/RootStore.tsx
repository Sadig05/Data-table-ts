import { makeAutoObservable, configure } from "mobx";
import { createContext , ReactNode, useContext} from "react";
import UserStore from "./UserStore";

configure({
  enforceActions: "never"
})

export class RootStore {
  userStore: UserStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
    this.userStore.getUsers(); 
  }
}

interface IStoreComponent {
    store: RootStore;
    children: ReactNode;
  }
  


export const StoreContext = createContext<RootStore> ({} as RootStore);

export const StoreProvider = ({ children, store }: IStoreComponent) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext<RootStore>(StoreContext);

export default RootStore;
