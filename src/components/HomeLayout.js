import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

import Navigation from "./Navigation";
import Loading from "./Loading";

function HomeLayout({ logout = null }) {
  return (
    <main className="bg-black w-dvw h-dvh flex flex-col text-white gap-10 overflow-auto pb-10">
      <div className="relative">
        <Navigation logout={logout} />
        <Loading />
      </div>
      <Outlet />
    </main>
  );
}

HomeLayout.propTypes = {
  logout: PropTypes.func,
};

export default HomeLayout;
