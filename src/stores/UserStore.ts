import { runInAction, makeAutoObservable, reaction } from "mobx";
import { IFilter, IUser } from "../models/User";
import userService from "../services/service"

class UserStore {
  userService: userService;  
  users: IUser[] = [];
  filters: IFilter  = { _page: 1, _limit: 10 };
  status: string = "inital";
  count: number = 0;
  constructor() {
    this.userService = new userService();
    makeAutoObservable(this);

    reaction(
      () => [this.filters],
      () => this.getUsers()
    );
  }

  getUsers = async () => {
    try {
      const { data, headers }  = await this.userService.getData(this.filters);
 
      const totalCount: number = parseInt(headers["x-total-count"]);
      console.log(totalCount);
      runInAction(() => {
        this.users = data;
        this.count = totalCount;
      });
    } catch (e) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  setFilters(filters: IFilter) {
    console.log(filters);
    this.filters = { ...this.filters, ...filters };
  }
}

export default UserStore;
