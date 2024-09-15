import PropTypes from "prop-types";
import parse from "html-react-parser";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import CategoryItem from "./CategoryItem";
import { postedAt } from "../utils";

function DetailThreadItem({
  id,
  title,
  body,
  upVotesBy,
  downVotesBy,
  createdAt,
  category,
  owner,
  like,
  dislike,
  neutralize,
}) {
  const { authUser } = useSelector((states) => states);
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = () => {
    if (authUser) {
      like(id);
    } else {
      alert("Please log in to upvote.");
    }
  };

  const handleDownVote = () => {
    if (authUser) {
      dislike(id);
    } else {
      alert("Please log in to downvote.");
    }
  };

  const handleNeutralizeVote = () => {
    neutralize(id);
  };

  return (
    <div className="flex flex-col gap-3 w-[42rem]">
      <CategoryItem category={category} />
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-lg">{parse(body)}</p>
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
        <div className="flex gap-1">
          <p className="text-md ">Dibuat oleh</p>
          <img
            src={owner.avatar}
            className="w-6 h-6 object-cover rounded-full"
            alt={owner.avatar}
          />
          <p>{owner.name}</p>
        </div>

        <p className="text-md ">{postedAt(createdAt)}</p>
      </div>
    </div>
  );
}

DetailThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  neutralize: PropTypes.func.isRequired,
};

export default DetailThreadItem;
