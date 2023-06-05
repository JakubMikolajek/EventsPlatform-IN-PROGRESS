import React from "react";
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import classes from "./eventDetail.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../store/store.ts";
import { fetchEventDetail } from "../hooks/fetchEventDetail.tsx";
import Loading from "../components/others/Loading.tsx";
import {
  formatDate,
  formatDateToCheck,
} from "../utils/functions/formatDate.ts";
import BackButton from "../components/buttons/BackButton.tsx";
import EventTickets from "../components/details/EventTickets.tsx";

const EventDetail: React.FC = () => {
  const params = useParams();
  const navigate: NavigateFunction = useNavigate();
  const isAuth: boolean = useSelector((state: StateProps) => state.auth.isAuth);
  let event_detail;
  let refetch_event: any;
  if (typeof params.eventId !== "undefined") {
    const { event, isLoading, refetch } = fetchEventDetail(
      params.eventId,
      true
    );
    if (isLoading) {
      return <Loading />;
    }
    event_detail = event;
    refetch_event = refetch;
  }

  const date: string = formatDate(event_detail);
  const date_to_check: string = formatDateToCheck(event_detail);
  const checkDate: Date = new Date(date_to_check);
  const currentDate: Date = new Date();
  const isEnded: boolean = checkDate <= currentDate;

  return (
    <div className={classes.mainContainer}>
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
              event_detail={event_detail}
              refetch={refetch_event}
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

export default EventDetail;
