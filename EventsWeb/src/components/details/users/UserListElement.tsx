import React from "react";
import classes from "./userListElement.module.scss";

interface UserListElementProps {
  user: any;
  creator_uuid: string | null | undefined;
}

const UserListElement: React.FC<UserListElementProps> = ({
  user,
  creator_uuid,
}) => {
  const administrator: boolean = user?.uuid === creator_uuid;

  return (
    <div className={classes.mainContainer}>
      <img src={user.image_url} alt={user.image_url} />
      <div className={classes.innerContainer}>
        <h1>
          {user.first_name} {user.last_name}
        </h1>
        {administrator && <p>Organizator</p>}
      </div>
    </div>
  );
};

export default UserListElement;
