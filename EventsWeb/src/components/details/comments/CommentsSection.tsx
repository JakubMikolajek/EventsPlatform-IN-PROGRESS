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
    <div className={classes.main_container}>
      <div className={classes.comments_container}>
        {comments.map((comment: any) => (
          <SingleComment comment={comment} refetch={refetch} id={id} />
        ))}
      </div>
      <CommentForm id={id} refetch={refetch} />
    </div>
  );
};

export default CommentsSection;
