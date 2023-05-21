import React, { useState } from "react";
import classes from "./lists.module.scss";

interface CategoryListProps {
  category: any;
  name: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ category, name }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const elementPerPage: number = 5;
  const totalPages: number = Math.ceil(category.length / elementPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * elementPerPage;
  const endIndex = startIndex + elementPerPage;
  const displayedCategories = category.slice(startIndex, endIndex);

  console.log(displayedCategories);

  return (
    <div className={classes.mainCategories}>
      <h1 className={classes.title}>{name}:</h1>
      <div className={classes.list}>
        {currentPage > 1 && (
          <button className={classes.arrow_left} onClick={handlePreviousPage}>
            &larr;
          </button>
        )}
        {displayedCategories.map((category: any) => (
          <div className={classes.list_element} key={category}>
            <h1>{category}</h1>
          </div>
        ))}
        {currentPage < totalPages && (
          <button className={classes.arrow_right} onClick={handleNextPage}>
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
