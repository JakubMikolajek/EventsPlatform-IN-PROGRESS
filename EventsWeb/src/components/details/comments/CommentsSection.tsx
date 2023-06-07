import React from "react";
import classes from "./commentsSection.module.scss";
import SingleComment from "./SingleComment.tsx";
import CommentForm from "../../forms/CommentForm.tsx";

interface CommentsSectionProps {
  comments: any;
  id: number | undefined;
  refetch: any;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  id,
  refetch,
}) => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.commentsContainer}>
        {comments.map((comment: any) => {
          return <SingleComment comment={comment} refetch={refetch} id={id} />;
        })}
      </div>
      <CommentForm id={id} refetch={refetch} />
    </div>
  );
};

export default CommentsSection;
