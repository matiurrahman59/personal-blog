import Head from 'next/head';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

const index = ({ eventsData }) => {
  return (
    <div>
      <Head>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
        <title>NextJS Events</title>
      </Head>
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
