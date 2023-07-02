import React from "react";

import SingleComment from "../SingleComment/SingleComment.tsx";
import CommentForm from "../../Forms/CommentForm/CommentForm.tsx";

import classes from "./commentsSection.module.scss";

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
