export interface INew {
  id: string;
  by: string;
  descendants: number;
  kids: string[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}
export interface IComment {
  id: string;
  by: string;
  kids: string[];
  parent: string;
  text: string;
  time: number;
  type: string;
}
export class Comment {
  comment: IComment;
  kids: Comment[] = [];
  constructor(comment: IComment) {
    this.comment = comment;
  }
}
export interface ITargetNew {
  item: INew;
  kids: Comment[];
}
