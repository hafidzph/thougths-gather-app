import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

function CommentList({ comments, like, dislike, neutralize }) {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold">{`Komentar (${comments.length})`}</h1>
      {comments.map((comment) => (
        <CommentItem
          {...comment}
          like={like}
          dislike={dislike}
          neutralize={neutralize}
        />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  neutralize: PropTypes.func.isRequired,
};

export default CommentList;
