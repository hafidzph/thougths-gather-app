import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import LeaderboardList from "../components/LeaderboardList";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";

function Leaderboards() {
  const dispatch = useDispatch();
  const { leaderboards } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-10 ">
      <h1 className="text-3xl font-semibold text-center">
        Klasemen Pengguna Aktif
      </h1>
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}

export default Leaderboards;
