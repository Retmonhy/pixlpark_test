import { Comment, IComment, IFindTreeeResult, ITargetNew } from './../types/index';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { api } from '../shared/api/news';
import { INew } from '../types';

export class AppStore {
  news: INew[] = [];
  isLoading: boolean;
  targetNew: ITargetNew | null;
  comments: IComment[] = [];
  constructor() {
    makeAutoObservable(
      this,
      {
        isLoading: true,
        news: true,
        targetNew: true,
        comments: true,
      },
      { deep: true }
    );
  }
  fetchNews = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const response = await api<string[]>('https://hacker-news.firebaseio.com/v0/newstories.json');
      const lastNews = response.slice(0, 100);

      await Promise.all(lastNews.map((id) => api<INew>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))).then((res) => {
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
        if (this.targetNew?.kids[0].comment.id) {
        }
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
  fetchDautherComments = async (parentId: string, commentsId: string[]) => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      if (commentsId) {
        await Promise.all(commentsId.map((id) => api<IComment>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))).then((res) => {
          runInAction(() => {
            const qwer = this.findTree(parentId, this.targetNew?.kids || []);
            if (!qwer.parent) {
              this.targetNew = {
                item: this.targetNew?.item as INew,
                kids:
                  this.targetNew?.kids.map((i) => {
                    if (i.comment.id === parentId) {
                      i.kids.push(...res.map((item) => new Comment(item)));
                    }
                    return i;
                  }) || [],
              };
            } else {
              qwer.parent.kids.map((i) => {
                if (i.comment.id === qwer.comment?.id) {
                  return { comment: i.comment, kids: res.map((item) => new Comment(item)) };
                }
                return i;
              });
            }
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
  private findTree = (id: string, incomingTrees: Comment[]): IFindTreeeResult => {
    let result: IFindTreeeResult | null = { parent: null, comment: null };
    for (let i = 0; i < incomingTrees.length; i++) {
      if (incomingTrees[i].comment.id === id) {
        return { parent: null, comment: incomingTrees[i].comment };
      }
      if (incomingTrees[i].kids) {
        result = {
          parent: this.findTree(id, incomingTrees[i].kids).parent ?? incomingTrees[i],
          comment: this.findTree(id, incomingTrees[i].kids).comment,
        };
        if (result.comment) break;
      }
    }
    return result;
  };
}
