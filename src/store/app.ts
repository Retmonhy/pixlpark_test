import { IComment, ITargetNew } from "./../types/index";
import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../shared/api/news";
import { INew } from "../types";

export class AppStore {
  news: INew[] = [];
  isLoading: boolean;
  targetNew: ITargetNew | null;
  constructor() {
    makeAutoObservable(this, {
      isLoading: true,
      news: true,
      targetNew: true,
    });
  }
  fetchNews = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.clearNews();
      });
      const response = await api<string[]>("https://hacker-news.firebaseio.com/v0/newstories.json");
      const lastNews = response.slice(0, 100);

      //воткнуть бы стек вызовов сюда чтобы запросы огромным списком не слались
      lastNews.map(async (id) => {
        const res = await this.fetchOneNew(id);
        if (res) {
          runInAction(() => {
            this.news = [...this.news, res];
          });
        }
      });
      this.news = this.sortNews();

      runInAction(() => {
        this.isLoading = false;
      });
    } catch (e) {
      console.log("fetchNews Error = ", e);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
  fetchOneNew = async (id: string) => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const res = await api<INew>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      runInAction(() => {
        this.isLoading = false;
      });
      return res;
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
      });
      console.error("fetchOneNew ERROR: ", e);
    }
  };
  fetchComment = async (commentId: string) => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      if (commentId) {
        const comment = await api<IComment>(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
        console.log("comment = ", comment);
      }
      runInAction(() => {
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
      console.error("fetchComment ERROR: ", error);
    }
  };
  setTargetNew = (item: INew) => {
    runInAction(() => {
      this.targetNew = { item, kids: [] };
    });
  };
  sortNews = () => {
    return this.news.slice().sort((a, b) => a.time - b.time);
  };
  clearNews = () => {
    runInAction(() => {
      this.news = [];
    });
  };
}
