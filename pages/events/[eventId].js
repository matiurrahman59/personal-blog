import React from 'react';

// data
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

// components
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

// const EventDetailPage = ({ selectedEvent }) => {
const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <div className='center'>
          <p>Loading...</p>
        </div>
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

// serverside code
export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

// dynamic page
export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default EventDetailPage;
