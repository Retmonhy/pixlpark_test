import { Comment, IComment, ITargetNew } from './../types/index';
import { makeAutoObservable, runInAction } from 'mobx';
import { api } from '../shared/api/news';
import { INew } from '../types';

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
  asyncFunc = (func: () => void) => {
    return () => {
      try {
        runInAction(() => {
          this.isLoading = true;
        });
        func();
        runInAction(() => {
          this.isLoading = false;
        });
      } catch (error) {
        console.log('asyncFunc Error = ', error);
        runInAction(() => {
          this.isLoading = false;
        });
      }
    };
  };
  fetchNews1 = this.asyncFunc(async () => {
    const response = await api<string[]>('https://hacker-news.firebaseio.com/v0/newstories.json');
    const lastNews = response.slice(0, 100);

    await Promise.all(lastNews.map((id) => this.fetchOneNew(id))).then((res) => {
      runInAction(() => {
        this.news = res as INew[];
      });
    });
    this.news = this.sortNews();
  });
  fetchNews = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const response = await api<string[]>('https://hacker-news.firebaseio.com/v0/newstories.json');
      const lastNews = response.slice(0, 100);

      await Promise.all(lastNews.map((id) => this.fetchOneNew(id))).then((res) => {
        runInAction(() => {
          this.news = res as INew[];
        });
      });
      this.news = this.sortNews();

      runInAction(() => {
        this.isLoading = false;
      });
    } catch (e) {
      console.log('fetchNews Error = ', e);
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
      console.error('fetchOneNew ERROR: ', e);
    }
  };
  fetchComments = async (commentsId: string[]) => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      if (commentsId) {
        await Promise.all(commentsId.map((id) => api<IComment>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))).then((res) => {
          runInAction(() => {
            this.targetNew = { item: this.targetNew!.item, kids: res.map((item) => new Comment(item)) };
          });
        });
      }
      runInAction(() => {
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
      console.error('fetchComment ERROR: ', error);
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
}
