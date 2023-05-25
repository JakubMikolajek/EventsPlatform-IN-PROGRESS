import React from "react";
import { fetchEventDetail } from "../../hooks/fetchEventDetail.tsx";
import classes from "./eventDetail.module.scss";
import { Link } from "react-router-dom";
import * as moment from "moment/moment";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";
import EventTickets from "./EventTickets.tsx";

interface EventDetailsProps {
  id: string | undefined;
}

const EventDetails: React.FC<EventDetailsProps> = ({ id }) => {
  const isAuth = useSelector((state: StateProps) => state.auth.isAuth);
  let event_detail;
  let refetch_event;
  if (typeof id !== "undefined") {
    const { event, isLoading, refetch } = fetchEventDetail(id, true);
    if (isLoading) {
      return <p>Loading....</p>;
    }
    event_detail = event;
    refetch_event = refetch;
  }

  const event_tickets: any = event_detail?.event_tickets;
  const e_date: moment.Moment = moment(event_detail?.event_date);
  const date_format: string = e_date.format("DD-MM-YYYY");
  const date_format_to_check: string = e_date.format("YYYY-MM-DD");
  const time: string = e_date.format("HH:mm");
  const date: string = [date_format, time].join(" ");
  const date_to_check: string = [date_format_to_check, time].join(" ");
  const checkDate = new Date(date_to_check);
  const currentDate = new Date();
  const isEnded = checkDate <= currentDate;

  return (
    <div className={classes.main}>
      <p>
        <Link className={classes.textDecoration} to="..">
          Powrót
        </Link>
      </p>
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
          <p>Kategoria: {event_detail?.event_category}</p>
        </div>
        <div className={classes.rightSide}>
          {isAuth ? (
            <EventTickets
              event_tickets={event_tickets}
              tickets_number={event_detail?.tickets_number}
              id={event_detail?.id}
              refetch={refetch_event}
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
