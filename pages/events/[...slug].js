import React from 'react';
import { useRouter } from 'next/router';

// data
import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import Button from '../../components/ui/button';
import Head from 'next/head';

const FilteredEventPage = ({ hasError, filteredEvents, filteredDate }) => {
  // const router = useRouter();
  // const filteredData = router.query.slug;

  // if (!filteredData) {
  //   return <p className='center'>Loading...</p>;
  // }

  // const filteredYear = filteredData[0];
  // const filteredMonth = filteredData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  const { year, month } = filteredDate;
  const date = new Date(year, month - 1);

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`All events for ${year}/${month}`} />
    </Head>
  );

  // check if invalid values
  if (hasError) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filteredData = params.slug;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // check if invalid values
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true, // render 404 page
      // redirect: {
      //   destination: '/error',
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents: filteredEvents,
      filteredDate: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventPage;
