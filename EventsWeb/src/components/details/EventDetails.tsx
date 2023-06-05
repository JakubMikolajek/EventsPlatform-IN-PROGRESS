import React from "react";
import { fetchEventDetail } from "../../hooks/fetchEventDetail.tsx";
import classes from "./eventDetail.module.scss";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import EventTickets from "./EventTickets.tsx";
import {
  formatDate,
  formatDateToCheck,
} from "../../utils/functions/formatDate.ts";
import BackButton from "../buttons/BackButton.tsx";
import Loading from "../others/Loading.tsx";

interface EventDetailsProps {
  id: string | undefined;
}

const EventDetails: React.FC<EventDetailsProps> = ({ id }) => {
  const navigate: NavigateFunction = useNavigate();
  const isAuth: boolean = useSelector((state: StateProps) => state.auth.isAuth);
  let event_detail;
  if (typeof id !== "undefined") {
    const { event, isLoading } = fetchEventDetail(id, true);
    if (isLoading) {
      return <Loading />;
    }
    event_detail = event;
  }

  const date: string = formatDate(event_detail);
  const date_to_check: string = formatDateToCheck(event_detail);
  const checkDate: Date = new Date(date_to_check);
  const currentDate: Date = new Date();
  const isEnded: boolean = checkDate <= currentDate;

  return (
    <div className={classes.main}>
      <BackButton onClick={() => navigate(-1)} />
      <div className={classes.event_detail}>
        <div className={classes.leftSide}>
          {event_detail?.image_url && (
            <img src={event_detail?.image_url} alt="event_img" />
          )}
          <h1>
            {event_detail?.title} - {date}, {event_detail?.event_location}
          </h1>
          {isEnded && <h3>Wydarzenie zakończone.</h3>}
          <h2>{event_detail?.description}</h2>
          <p>
            Kategoria:{" "}
            <Link to={`/categories/${event_detail?.event_category}`}>
              {event_detail?.event_category}
            </Link>
          </p>
        </div>
        <div className={classes.rightSide}>
          {isAuth ? (
            <EventTickets
              id_Str={id}
              id_Num={event_detail?.id}
              creator_uuid={event_detail?.creator_uuid}
            />
          ) : (
            <p>
              Zaloguj się aby wziąść udział i uzyskać informację o ilości
              dostępnych miejsc.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
