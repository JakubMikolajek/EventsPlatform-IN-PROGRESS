import React from "react";
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "../../components/Navigation/Loading/Loading.tsx";
import BackButton from "../../components/Buttons/BackButton/BackButton.tsx";
import EventTickets from "../../components/Details/EventTickets/EventTickets.tsx";
import CommentsSection from "../../components/Details/CommentSection/CommentsSection.tsx";
import ListOfUsersWithTickets from "../../components/Details/ListOfUsersWithTickets/ListOfUsersWithTickets.tsx";

import classes from "./eventDetail.module.scss";

import { StateProps } from "../../store/store.ts";
import { fetchEventDetail } from "../../hooks/fetchEventDetail.tsx";
import { fetchFavoriteData } from "../../hooks/fetchFavoriteData.tsx";
import {
  formatDate,
  formatDateToCheck,
} from "../../utils/functions/formatDate.ts";

const EventDetail: React.FC = () => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  const params = useParams();
  const navigate: NavigateFunction = useNavigate();
  const isAuth: boolean = useSelector((state: StateProps) => state.auth.isAuth);
  let event_detail;
  let detail_isLoading;
  let refetch_event: any;
  let favorite_data;
  let favorite_isLoading;
  let refetch_favorite: any;

  if (typeof params.eventId !== "undefined") {
    const { event, isLoading, refetch } = fetchEventDetail(
      params.eventId,
      true
    );

    event_detail = event;
    detail_isLoading = isLoading;
    refetch_event = refetch;
  }

  if (typeof params.eventId !== "undefined") {
    const { postFavoriteData, isLoading, refetch } = fetchFavoriteData(
      params.eventId,
      true
    );

    favorite_data = postFavoriteData;
    favorite_isLoading = isLoading;
    refetch_favorite = refetch;
  }

  const isLoading = detail_isLoading || favorite_isLoading;

  if (detail_isLoading || favorite_isLoading) {
    return <Loading />;
  }

  const date: string = formatDate(event_detail);
  const date_to_check: string = formatDateToCheck(event_detail);
  const checkDate: Date = new Date(date_to_check);
  const currentDate: Date = new Date();
  const isEnded: boolean = checkDate <= currentDate;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={
            isDark ? classes.main_container_dark : classes.main_container_light
          }
        >
          <BackButton onClick={() => navigate(-1)} />
          <div className={classes.event_detail}>
            <div className={classes.left_side}>
              {event_detail?.image_url && (
                <img src={event_detail?.image_url} alt="event_img" />
              )}
              <h1>{event_detail?.title}</h1>
              <h1>
                {date} - {event_detail?.event_location}
              </h1>
              {isEnded && <h3>Wydarzenie zakończone.</h3>}
              <h2>{event_detail?.description}</h2>
              <p>
                Kategoria:{" "}
                <Link
                  className={classes.text_decoration}
                  to={`/categories/${event_detail?.event_category}`}
                >
                  {event_detail?.event_category}
                </Link>
              </p>
            </div>
            <div className={classes.right_side}>
              {isAuth ? (
                <div>
                  <EventTickets
                    event_detail={event_detail}
                    refetch_event={refetch_event}
                    favorite_data={favorite_data}
                    refetch_favorite={refetch_favorite}
                    creator_uuid={event_detail?.creator_uuid}
                  />
                  <div className={classes.inner_right_side}>
                    <CommentsSection
                      id={event_detail?.id}
                      comments={event_detail?.comments}
                      refetch={refetch_event}
                    />
                    <ListOfUsersWithTickets
                      creator_uuid={event_detail?.creator_uuid}
                      id={event_detail?.id}
                    />
                  </div>
                </div>
              ) : (
                <p>
                  Zaloguj się aby wziąść udział i uzyskać informację o ilości
                  dostępnych miejsc.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetail;
