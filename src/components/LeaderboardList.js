import PropTypes from "prop-types";

import LeaderboardItem from "./LeaderboardItem";

function LeaderboardList({ leaderboards }) {
  return (
    <div className="w-full max-w-[45rem] mx-auto overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between text-sm font-medium text-white">
        <span className="text-xl">Pengguna</span>
        <span className="text-xl">Skor</span>
      </div>
      <ul>
        {leaderboards.map((leaderboard) => (
          <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
        ))}
      </ul>
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      users: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LeaderboardList;
