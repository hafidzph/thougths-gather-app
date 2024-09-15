import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  asyncDownVoteDetailThread,
  asyncGetDetailThread,
  asyncNeutralizeVoteDetailThread,
  asyncUpVoteDetailThread,
} from "../states/detailThread/action";
import DetailThreadItem from "../components/DetailThreadItem";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import {
  asyncCreateComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
  asyncUpVoteComment,
} from "../states/comment/action";

function DetailThread() {
  const dispatch = useDispatch();
  const { detailThread, comment, authUser } = useSelector((states) => states);
  const { threadId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(asyncGetDetailThread(threadId))
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch, threadId]);

  const onAddComment = ({ content }) => {
    dispatch(asyncCreateComment({ content }));
  };

  const onLikeComment = ({ commentId }) => {
    dispatch(asyncUpVoteComment({ commentId }));
  };

  const onDislikeComment = ({ commentId }) => {
    dispatch(asyncDownVoteComment({ commentId }));
  };

  const neutralizeLikeComment = ({ commentId }) => {
    dispatch(asyncNeutralizeCommentVote({ commentId }));
  };

  const onLikeDetail = (id) => {
    dispatch(asyncUpVoteDetailThread(id));
  };

  const onDislikeDetail = (id) => {
    dispatch(asyncDownVoteDetailThread(id));
  };

  const neutralizeLikeDetail = (id) => {
    dispatch(asyncNeutralizeVoteDetailThread(id));
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col mx-auto gap-8">
      <DetailThreadItem
        {...detailThread}
        like={onLikeDetail}
        dislike={onDislikeDetail}
        neutralize={neutralizeLikeDetail}
      />
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-lg font-semibold">Beri Komentar</h1>
        {authUser ? (
          <CommentForm comment={onAddComment} />
        ) : (
          <div>
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Login
            </Link>
            <span>&nbsp;Untuk memberi komentar</span>
          </div>
        )}
      </div>

      <CommentList
        comments={comment}
        like={onLikeComment}
        dislike={onDislikeComment}
        neutralize={neutralizeLikeComment}
      />
    </div>
  );
}

export default DetailThread;
