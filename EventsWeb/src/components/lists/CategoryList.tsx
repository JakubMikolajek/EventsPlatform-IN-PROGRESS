import React, { useEffect, useState } from "react";
import classes from "./categoryList.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import ArrowsWrapper from "../others/ArrowsWrapper.tsx";

interface CategoryListProps {
  category: any;
  name: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ category, name }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isDark = useSelector((state: StateProps) => state.theme.isDark);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  let elementPerPage: number;

  if (windowWidth < 600) {
    elementPerPage = 1;
  } else {
    elementPerPage = 5;
  }

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
    <div className={classes.main_categories}>
      <h1 className={isDark ? classes.title_dark : classes.title_light}>
        {name}:
      </h1>
      <ArrowsWrapper
        elementLength={category.length}
        endIndex={endIndex}
        startIndex={startIndex}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      >
        <div className={classes.list}>
          {displayedCategories.map((category: any) => (
            <Link
              className={
                isDark ? classes.list_element_dark : classes.list_element_light
              }
              key={category}
              to={`categories/${category}`}
            >
              <h1>{category}</h1>
            </Link>
          ))}
        </div>
      </ArrowsWrapper>
    </div>
  );
};

export default CategoryList;
