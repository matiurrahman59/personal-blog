import React from 'react';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../dummy-data';

const index = () => {
  const featureEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featureEvents} />
    </div>
  );
};

export default index;
