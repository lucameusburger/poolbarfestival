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
      fetch(BASE_URL + 'items/events')
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

            const filteredFetchedEvents = fetchedEvents.sort((b, a) => {
              return new Date(b.day_item.date_start) - new Date(a.day_item.date_start);
            });

            dispatch(setEvents(filteredFetchedEvents));
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