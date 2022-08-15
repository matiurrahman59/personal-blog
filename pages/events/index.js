import React from 'react';
import { useRouter } from 'next/router';
// data
import { getAllEvents } from '../../helpers/api-util';

// component
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import Head from 'next/head';

const Events = ({ events }) => {
  const router = useRouter();
  // const events = getAllEvents();

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

export default Events;
