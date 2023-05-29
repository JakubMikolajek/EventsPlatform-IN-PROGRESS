import React, { useState } from "react";
import classes from "./categoryList.module.scss";
import { Link } from "react-router-dom";

interface CategoryListProps {
  category: any;
  name: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ category, name }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const elementPerPage: number = 5;
  const shiftAmount: number = 1;

  const handlePreviousPage = () => {
    setCurrentSlide((prevPage: number) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentSlide((prevPage: number) => prevPage + 1);
  };

  const startIndex: number = (currentSlide - 1) * shiftAmount;
  const endIndex: number = startIndex + elementPerPage;
  const displayedCategories = category.slice(startIndex, endIndex);

  return (
    <div className={classes.mainCategories}>
      <h1 className={classes.title}>{name}:</h1>
      <div className={classes.innerMainCategories}>
        {startIndex >= 1 && (
          <button className={classes.arrow_left} onClick={handlePreviousPage}>
            &larr;
          </button>
        )}
        <div className={classes.list}>
          {displayedCategories.map((category: any) => (
            <Link
              className={classes.list_element}
              key={category}
              to={`categories/${category}`}
            >
              <h1>{category}</h1>
            </Link>
          ))}
        </div>
        {endIndex < category.length && (
          <button className={classes.arrow_right} onClick={handleNextPage}>
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
