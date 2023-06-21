import React from "react";
import classes from "./userListElement.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../../store/store.ts";

interface UserListElementProps {
  user: any;
  creator_uuid: string | null | undefined;
}

const UserListElement: React.FC<UserListElementProps> = ({
  user,
  creator_uuid,
}) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  const administrator: boolean = user?.uuid === creator_uuid;

  return (
    <div className={classes.main_container}>
      <img src={user.image_url} alt={user.image_url} />
      <div
        className={
          isDark ? classes.inner_container_dark : classes.inner_container_light
        }
      >
        <h1>
          {user.first_name} {user.last_name}
        </h1>
        {administrator && <p>Organizator</p>}
      </div>
    </div>
  );
};

export default UserListElement;
