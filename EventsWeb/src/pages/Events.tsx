import React from "react";
import { fetchEvents } from "../hooks/fetchEvents.tsx";

const Events: React.FC = () => {
  const { events, isLoading }: any = fetchEvents(true);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(events);

  return (
    <div>
      <h1>Events Home Page</h1>
    </div>
  );
};

export default Events;
