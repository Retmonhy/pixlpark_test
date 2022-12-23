import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import store from '../store';
import { Comment } from '../types';

interface ICommentsTreeProps {
  comments: Comment[];
}
export const CommentsTree: FC<ICommentsTreeProps> = observer(({ comments }) => {
  const { fetchDautherComments } = store.app;
  return (
    <div>
      {comments.map((item) => {
        return (
          <div className="comment--relative" key={item.comment.id}>
            <>
              <div className="comment--wrapper">
                <p className="comment--by">{item.comment.by}</p>
                <div>
                  <span>{item.comment.text}</span>
                </div>
                {item.comment.kids && item.comment.kids.length > 0 && (
                  <button
                    className="btn"
                    onClick={() => {
                      fetchDautherComments(item.comment.id, item.comment.kids || []);
                    }}
                  >
                    Еще
                  </button>
                )}
              </div>
              <div className="comment--childrens">
                <CommentsTree comments={[...item.kids]} />
              </div>
            </>
          </div>
        );
      })}
    </div>
  );
});
