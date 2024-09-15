import PropTypes from "prop-types";

function LeaderboardItem({ user: { name, avatar }, score }) {
  return (
    <li className="px-4 py-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-12 h-12 flex-shrink-0 mr-3 rounded-full overflow-hidden">
          <img
            src={avatar}
            className="w-full h-full object-cover"
            alt={avatar}
          />
        </div>
        <div className="text-lg font-medium ">{name}</div>
      </div>
      <div className="text-lg ">{score}</div>
    </li>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
