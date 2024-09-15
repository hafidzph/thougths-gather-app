import PropTypes from "prop-types";

function CategoryItem({ category, onCategoryClick = null, activeCategory }) {
  const handleClick = () => {
    if (onCategoryClick) onCategoryClick(category);
  };

  return (
    <button
      type="button"
      className={`border-2 px-3 py-2 rounded-md w-fit ${
        onCategoryClick ? "cursor-pointer" : ""
      } ${activeCategory ? "bg-gray-700 text-white" : "text-white"}`}
      onClick={handleClick}
      disabled={!onCategoryClick}
    >
      {`#${category}`}
    </button>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  onCategoryClick: PropTypes.func,
  activeCategory: PropTypes.bool.isRequired,
};

export default CategoryItem;
