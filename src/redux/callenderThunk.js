import * as Calendar from 'expo-calendar';

function setIsPermissionGranted(isGranted) {
  return {
    type: 'SET_PERMISSION_GRANTED',
    payload: isGranted,
  };
}

function setCallenderId(callenderId) {
  return {
    type: 'SET_CALLENDER_ID',
    payload: callenderId,
  };
}

function addToCallenderEvents(type, id, eventId) {
  return {
    type: 'ADD_TO_CALLENDER_EVENTS',
    payload: {
      type,
      id,
      eventId,
    },
  };
}

function removeFromCallenderEventsById(eventId) {
  return {
    type: 'REMOVE_FROM_CALLENDER_EVENTS_BY_ID',
    payload: eventId,
  };
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource = Platform.OS === 'ios' ? await getDefaultCalendarSource() : { isLocalAccount: true, name: 'Poolbar Events' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Poolbar Events',
    color: '#FFC23B',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'PoolbarEvents',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
    allowsModifications: false,
    isSynced: true,
  });
  return newCalendarID;
}

async function createEvent(callenderId, title, id, startDate, endDate, location = '') {
  const newEventId = await Calendar.createEventAsync(callenderId, {
    title: title,
    id: id,
    startDate: startDate,
    endDate: endDate,
    location: 'Poolbar ' + location,
    timeZone: 'Europe/London',
    alarms: [
      {
        relativeOffset: -24 * 60,
        method: Calendar.AlarmMethod.ALERT,
      },
    ],
  });

  return newEventId;
}

async function deleteEvent(eventId) {
  await Calendar.deleteEventAsync(eventId);
}

export function deleteCallenderEvent(eventId) {
  return async (dispatch, getState) => {
    const isPermissionGranted = getState().callender.isPermissionGranted;
    if (!isPermissionGranted) {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        return;
      } else {
        dispatch(setIsPermissionGranted(true));
      }
    }
    const events = getState().events.data;

    const callenderEvents = getState().callender.events;
    const filteredCallenderEvents = callenderEvents.filter((event) => event.id === eventId);

    filteredCallenderEvents.forEach((callenderEvent) => {
      deleteEvent(callenderEvent.eventId).then(() => dispatch(removeFromCallenderEventsById(callenderEvent.eventId)));
    });
  };
}

export function addCallenderEvent(eventId) {
  return async (dispatch, getState) => {
    const isPermissionGranted = getState().callender.isPermissionGranted;
    if (!isPermissionGranted) {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        return;
      } else {
        dispatch(setIsPermissionGranted(true));
      }
    }

    let callenderId = getState().callender.callenderId;
    if (!callenderId) {
      callenderId = await createCalendar();
      if (callenderId) {
        dispatch(setCallenderId(callenderId));
      } else {
        return;
      }
    }
    const events = getState().events.data;
    const event = events.find((event) => event.id === eventId);

    const startDate = new Date(event.day_item.date_start);
    if (event.time_doors) {
      startDate.setHours(event.time_doors.split(':')[0]);
      startDate.setMinutes(event.time_doors.split(':')[1]);
    } else {
      startDate.setHours(18);
      startDate.setMinutes(0);
    }

    const endDate = new Date(event.day_item.date_start);
    if (event.time_show_end) {
      endDate.setHours(event.time_show_end.split(':')[0]);
      endDate.setMinutes(event.time_show_end.split(':')[1]);
    } else {
      endDate.setHours(startDate.getHours() + 6);
      endDate.setMinutes(startDate.getMinutes());
    }

    createEvent(callenderId, event.name, event.id, startDate, endDate, event?.room_item?.name).then((eventId) => dispatch(addToCallenderEvents('Event', event.id, eventId)));
  };
}
