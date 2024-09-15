import PropTypes from "prop-types";

import CategoryItem from "./CategoryItem";

function CategoryList({
  categories,
  onCategoryClick,
  selectedCategory = null,
}) {
  return (
    <div className="flex flex-col gap-5 p-2">
      <h1 className="text-2xl font-semibold">Kategori Popular</h1>
      {categories.map((category) => (
        <CategoryItem
          category={category}
          onCategoryClick={onCategoryClick}
          activeCategory={selectedCategory === category}
          key={category}
        />
      ))}
    </div>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default CategoryList;
