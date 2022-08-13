import React from 'react';
import EventItem from './event-item';

// styles
import styles from './event-list.module.css';

const EventList = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EventList;
