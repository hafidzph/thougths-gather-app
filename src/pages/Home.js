import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CategoryList from "../components/CategoryList";
import ThreadList from "../components/ThreadList";
import asyncPopulateUsersAndThreads from "../states/shared/action";
import {
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  asyncUpVoteThread,
} from "../states/threads/action";

function Home() {
  const dispatch = useDispatch();
  const { threads } = useSelector((states) => states);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? "" : category
    );
  };

  const onLike = (id) => {
    dispatch(asyncUpVoteThread(id));
  };

  const onDislike = (id) => {
    dispatch(asyncDownVoteThread(id));
  };

  const neutralizeLike = (id) => {
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  return (
    <div className="flex gap-10 justify-center">
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      <div className="flex flex-col gap-10 justify-center items-center">
        <h1 className="text-3xl font-semibold">Diskusi Tersedia</h1>
        <ThreadList
          threads={filteredThreads}
          like={onLike}
          dislike={onDislike}
          neutralize={neutralizeLike}
        />
      </div>
    </div>
  );
}

export default Home;
