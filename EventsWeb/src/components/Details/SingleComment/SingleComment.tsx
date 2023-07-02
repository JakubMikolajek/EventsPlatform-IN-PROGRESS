import React from "react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import classes from "./singleComment.module.scss";

import { StateProps } from "../../../store/store.ts";
import { fetchSingleUser } from "../../../hooks/fetchSingleUser.tsx";
import { deleteComment } from "../../../supabase/requests/events.ts";

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
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  const client: QueryClient = useQueryClient();
  const { user, isLoading } = fetchSingleUser(comment?.creator_uuid, true);

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
    <>
      {isLoading ? null : (
        <div className={classes.main_container}>
          {user?.image_url && (
            <img
              className={classes.img}
              src={user?.image_url}
              alt={user?.image_url}
            />
          )}
          <div className={classes.text_container}>
            <div
              className={isDark ? classes.column_dark : classes.column_light}
            >
              <h2>
                {user?.first_name} {user?.last_name}:
              </h2>
              <h1>{comment.body}</h1>
            </div>
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => deleteCommentMutation.mutate()}
              size="lg"
              className={isDark ? classes.icon_dark : classes.icon_light}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleComment;
