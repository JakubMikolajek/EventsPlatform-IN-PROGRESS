import React from "react";
import { fetchSingleUser } from "../../../hooks/fetchSingleUser.tsx";
import classes from "./singleComment.module.scss";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteComment } from "../../../supabase/api/events.ts";

interface SingleCommentProps {
  comment: any;
  refetch: any;
  id: number | undefined;
}

const SingleComment: React.FC<SingleCommentProps> = ({
  comment,
  refetch,
  id,
}) => {
  const client: QueryClient = useQueryClient();
  const { user, isLoading } = fetchSingleUser(comment?.creator_uuid, true);

  if (isLoading) {
    return null;
  }

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(comment.id),
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["events", id]);
      await refetch();
    },
  });

  return (
    <div className={classes.mainContainer}>
      {user?.image_url && (
        <img
          className={classes.img}
          src={user?.image_url}
          alt={user?.image_url}
        />
      )}
      <div className={classes.textContainer}>
        <div className={classes.column}>
          <h2>
            {user?.first_name} {user?.last_name}:
          </h2>
          <h1>{comment.body}</h1>
        </div>
        <h3 onClick={() => deleteCommentMutation.mutate()}>X</h3>
      </div>
    </div>
  );
};

export default SingleComment;
