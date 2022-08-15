import React from 'react';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

const index = ({ eventsData }) => {
  return (
    <div>
      <EventList items={eventsData} />
    </div>
  );
};

export async function getStaticProps() {
  const featureEventsData = await getFeaturedEvents();

  return {
    props: {
      eventsData: featureEventsData,
    },
    revalidate: 1800,
  };
}

export default index;
