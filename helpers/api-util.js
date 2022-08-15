// get all events data
export async function getAllEvents() {
  const res = await fetch(
    'https://nextjs-in-practice-default-rtdb.firebaseio.com/events.json'
  );
  const data = await res.json();

  const eventsData = [];

  for (const key in data) {
    eventsData.push({
      id: key,
      ...data[key],
    });
  }

  return eventsData;
}

// get featured data only
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

// get eventdata by id
export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

// get filtered event
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
