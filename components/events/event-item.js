//
import Image from 'next/image';

// component
import Button from '../ui/button';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';

// styles
import styles from './event-item.module.css';

const EventItem = ({ item }) => {
  const { title, image, date, location, id } = item;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatedAddress = location.replace(', ', '\n');

  const explorLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <Image src={'/' + image} alt={title} width={250} height={160} />
      {/* <img src={'/' + image} alt={title} /> */}
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={explorLink}>
            <span>Explore Event</span>

            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
