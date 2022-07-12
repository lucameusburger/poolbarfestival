import { fetchArtists } from './artistsThunk';

const BASE_URL = 'https://www.admin.poolbar.at/';

function setEvents(artists) {
  return {
    type: 'SET_EVENTS',
    payload: artists,
  };
}

function setIsFetchingData(isFetching) {
  return {
    type: 'SET_IS_FETCHING_EVENTS',
    payload: isFetching,
  };
}

function setHasFetchingDataError(hasError) {
  return {
    type: 'SET_HAS_FETCHING_EVENTS_ERROR',
    payload: hasError,
  };
}

export function fetchEvents() {
  return (dispatch, getState) => {
    const isFetchingData = getState().events.isFetchingData;
    if (isFetchingData) {
      return;
    } else {
      console.log('fetching events...');
      dispatch(setIsFetchingData(true));
      dispatch(fetchArtists());
      fetch(BASE_URL + 'items/events?limit=9999')
        .then(async (response) => {
          // check for error response
          if (response.ok) {
            const data = await response.json();
            const fetchedEvents = data.data;
            await Promise.all(
              fetchedEvents.map(async (item) => {
                item.day_item = {};
                if (!item.day) return item;
                const resp = await fetch(BASE_URL + 'items/days/' + item.day);
                const data = await resp.json();
                if (!data.data) return item;
                item.day_item = data.data;

                return item;
              })
            );

            const sortedFetchedEvents = fetchedEvents.sort((b, a) => {
              const dateStartA = new Date(a.day_item.date_start);
              const dateStartAFormatted =
                dateStartA.getFullYear() +
                '-' +
                (dateStartA.getMonth() + 1).toString().padStart(2, '0') +
                '-' +
                dateStartA.getDate().toString().padStart(2, '0');

              const dateStartB = new Date(b.day_item.date_start);
              const dateStartBFormatted =
                dateStartB.getFullYear() +
                '-' +
                (dateStartB.getMonth() + 1).toString().padStart(2, '0') +
                '-' +
                dateStartB.getDate().toString().padStart(2, '0');

              return (
                new Date(
                  dateStartBFormatted + 'T' + (b.time_show_start || '12:00:00')
                ) -
                new Date(
                  dateStartAFormatted + 'T' + (a.time_show_start || '12:00:00')
                )
              );
            });

            dispatch(setEvents(sortedFetchedEvents));
          } else {
            const error = (data && data.message) || response.status;
            console.log('Fetching Events Error: ', error);
            dispatch(setHasFetchingDataError(true));
          }
        })
        .catch((error) => {
          console.error('Error loading Events: ', error);
          dispatch(setHasFetchingDataError(true));
        })
        .finally(() => {
          console.log('Finished loading Events');
          dispatch(setIsFetchingData(false));
        });
    }
  };
}

export function fetchEvent(eventId) {
  return fetchEvents();
}
