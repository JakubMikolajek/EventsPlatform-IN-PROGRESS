import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./categoryListElement.module.scss";

import { StateProps } from "../../../store/store.ts";

interface CategoryListElementProps {
  category: any;
}

const CategoryListElement: React.FC<CategoryListElementProps> = ({
  category,
}) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <Link
      className={
        isDark ? classes.list_element_dark : classes.list_element_light
      }
      key={category}
      to={`categories/${category}`}
    >
      <h1>{category}</h1>
    </Link>
  );
};

export default CategoryListElement;
