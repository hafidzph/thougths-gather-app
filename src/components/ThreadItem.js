import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { postedAt } from "../utils";

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  ownerName,
  totalComments,
  upVotesBy,
  downVotesBy,
  like,
  dislike,
  neutralize,
  avatar,
}) {
  const { authUser } = useSelector((states) => states);
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);
  const navigate = useNavigate();

  const handleDetailThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  const handleUpVote = () => {
    if (authUser) {
      like(id);
    } else {
      alert("Please log in to UpVote thread.");
    }
  };

  const handleDownVote = () => {
    if (authUser) {
      dislike(id);
    } else {
      alert("Please log in to DownVote Thread.");
    }
  };

  const handleNeutralizeVote = () => {
    neutralize(id);
  };

  return (
    <div className="flex flex-col p-5 gap-4 border-2 border-white rounded-md">
      <div className="flex justify-between gap-3">
        <button
          type="button"
          className="text-2xl cursor-pointer bg-transparent border-none p-0 text-start"
          onClick={handleDetailThreadClick}
        >
          {title}
        </button>
        <p className="text-md border-2 border-white rounded-md h-fit p-1">
          {`#${category}`}
        </p>
      </div>
      <div className="line-clamp-2">{parse(body)}</div>
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
        <div className="flex gap-1 justify-start items-center">
          <LiaCommentDotsSolid size={20} />
          <span>{totalComments}</span>
        </div>
        <p className="text-md ">{postedAt(createdAt)}</p>
        <div className="flex gap-1">
          <p className="text-md ">Dibuat oleh</p>
          <img
            src={avatar}
            className="w-6 h-6 object-cover rounded-full"
            alt={avatar}
          />
          <p>{ownerName}</p>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  neutralize: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ThreadItem;
