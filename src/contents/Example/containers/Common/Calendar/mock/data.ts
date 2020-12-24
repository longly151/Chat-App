/* eslint-disable import/prefer-default-export */
function getPastDate(days: number) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}
function getFutureDates(days: number) {
  const array = [];
  for (let index = 1; index <= days; index += 1) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}
const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

export const ITEMS = [
  { title: dates[0], data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }] },
  {
    title: dates[1],
    data: [
      { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
      { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }
    ]
  },
  {
    title: dates[2],
    data: [
      { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
      { hour: '2pm', duration: '1h', title: 'Deep Streches' },
      { hour: '3pm', duration: '1h', title: 'Private Yoga' }
    ]
  },
  { title: dates[3], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
  { title: dates[4], data: [{}] },
  {
    title: dates[5],
    data: [
      { hour: '9pm', duration: '1h', title: 'Middle Yoga' },
      { hour: '10pm', duration: '1h', title: 'Ashtanga' },
      { hour: '11pm', duration: '1h', title: 'TRX' },
      { hour: '12pm', duration: '1h', title: 'Running Group' }
    ]
  },
  { title: dates[6], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
  { title: dates[7], data: [{}] },
  {
    title: dates[8],
    data: [
      { hour: '9pm', duration: '1h', title: 'Pilates Reformer' },
      { hour: '10pm', duration: '1h', title: 'Ashtanga' },
      { hour: '11pm', duration: '1h', title: 'TRX' },
      { hour: '12pm', duration: '1h', title: 'Running Group' }
    ]
  },
  {
    title: dates[9],
    data: [
      { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
      { hour: '2pm', duration: '1h', title: 'Deep Streches' },
      { hour: '3pm', duration: '1h', title: 'Private Yoga' }
    ]
  },
  { title: dates[10], data: [{ hour: '12am', duration: '1h', title: 'Last Yoga' }] }
];
