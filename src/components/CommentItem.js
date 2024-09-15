import PropTypes from "prop-types";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";
import { postedAt } from "../utils";

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  like,
  dislike,
  neutralize,
}) {
  const { name, avatar } = owner;
  const { authUser } = useSelector((states) => states);

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = () => {
    if (authUser) {
      like({ commentId: id });
    } else {
      alert("Please log in to UpVote Thread.");
    }
  };

  const handleDownVote = () => {
    if (authUser) {
      dislike({ commentId: id });
    } else {
      alert("Please log in to DownVote Thread.");
    }
  };

  const handleNeutralizeVote = () => {
    neutralize({ commentId: id });
  };

  return (
    <div className="flex items-start gap-5 flex-col">
      <div className="flex items-center w-full justify-between">
        <div className="flex gap-2 items-center">
          <img src={avatar} alt={name} className="w-7 h-7 rounded-full" />
          <h3 className="font-semibold ">{name}</h3>
        </div>
        <span className="text-sm ">{postedAt(createdAt)}</span>
      </div>
      <p className="text-lg">{parse(content)}</p>
      <div className="flex gap-4">
        <div className="flex gap-1 justify-start items-center cursor-pointer">
          {isUpVoted ? (
            <FaThumbsUp size={18} onClick={handleNeutralizeVote} />
          ) : (
            <FaRegThumbsUp size={20} onClick={handleUpVote} />
          )}
          <span>{upVotesBy.length}</span>
        </div>
        <div className="flex gap-1 justify-start items-center cursor-pointer">
          {isDownVoted ? (
            <FaThumbsDown size={18} onClick={handleNeutralizeVote} />
          ) : (
            <FaRegThumbsDown size={20} onClick={handleDownVote} />
          )}
          <span>{downVotesBy.length}</span>
        </div>
      </div>
      <hr className="w-full border-t-2 border-gray-600 mt-4" />
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  neutralize: PropTypes.func.isRequired,
};

export default CommentItem;
