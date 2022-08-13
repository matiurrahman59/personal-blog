import React from 'react';
import { useRouter } from 'next/router';
// data
import { getAllEvents } from '../../dummy-data';

// component
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

const Events = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  );
};

export default Events;
