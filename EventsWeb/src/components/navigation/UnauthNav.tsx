import React, { useState } from "react";
import NavButton from "../buttons/NavButton.tsx";
import classes from "./unAuth.module.scss";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

const UnauthNav: React.FC = () => {
  const isDark: boolean = useSelector(
    (state: StateProps) => state.theme.isDark
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={isDark ? classes.container_dark : classes.container_light}>
      <div className={classes.web}>
        <NavButton isAlt={true} title="Zaloguj się" path="/login" />
        <NavButton isAlt={false} title="Zarejestruj się" path="/register" />
      </div>
      <div className={classes.mobile}>
        <FontAwesomeIcon
          className={classes.icon}
          icon={isOpen ? faXmark : faBars}
          onClick={() => toggleMenu()}
          size="xl"
        />
        <div className={isOpen ? classes.elements_active : classes.elements}>
          <div className={isDark ? classes.active_dark : classes.active_light}>
            <div className={classes.element}>
              <NavButton
                isAlt={true}
                title="Zaloguj się"
                path="/login"
                onClick={closeMenu}
              />
            </div>
            <div className={classes.element}>
              <NavButton
                isAlt={false}
                title="Zarejestruj się"
                path="/register"
                onClick={closeMenu}
              />
            </div>
            <FontAwesomeIcon
              className={classes.icon}
              icon={isOpen ? faXmark : faBars}
              onClick={() => toggleMenu()}
              size="xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthNav;
