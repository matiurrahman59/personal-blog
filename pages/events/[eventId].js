import React from 'react';
import { useRouter } from 'next/router';

// data
import { getEventById } from '../../dummy-data';

// components
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

const EventDetailPage = () => {
  const { query } = useRouter();

  const event = getEventById(query.eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>{event && <p>{event.description}</p>}</EventContent>
    </>
  );
};

export default EventDetailPage;
