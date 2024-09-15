import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import ThreadItem from "./ThreadItem";

function ThreadList({ threads, like, neutralize, dislike }) {
  const { users } = useSelector((states) => states);
  return (
    <div className="w-[40rem] flex flex-col gap-10">
      {threads.map((thread) => {
        const owner = users.find((user) => user.id === thread.ownerId);
        return (
          <ThreadItem
            key={thread.id}
            {...thread}
            ownerName={owner.name}
            avatar={owner.avatar}
            like={like}
            dislike={dislike}
            neutralize={neutralize}
          />
        );
      })}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  like: PropTypes.func.isRequired,
  neutralize: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default ThreadList;
