import React, { useState, useEffect } from "react";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventInput,
} from "@fullcalendar/react";
import { ToggleMenu } from "../../styles/styled-components/StyledAssets";
import downArrow from "../../assets/down-arrow.png";
import upArrow from "../../assets/up-arrow.png";
import CalendarOptions from "./CalendarOptions";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "../../components/utils/event-utils";
import AddButtonImg from "../assets/add-button.png";
import confirmDelete from "../../components/confirmDelete";

import { Flex } from "../../styles/styled-components/StyledContainers";

const CalendarComp = (props) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [seeAllEvents, setSeeAllEvents] = useState(false);
  const [calEvents, setCalEvents] = useState([]);
  const [menu, toggleMenu] = useState(false);

  //Create Event Arrays
  let jobEventArray = props.jobs.map((job) => {
    return {
      id: createEventId(),
      title: `Applied to ${job.company_name}`,
      start: `${job.date_applied}`.replace(/T.*$/, ""),
      backgroundColor: "#1B4079",
    };
  });

  let jobsAddedArray = props.jobs.map((job) => {
    return {
      id: createEventId(),
      title: `Added ${job.company_name}`,
      start: `${job.date_added}`.replace(/T.*$/, ""),
      backgroundColor: "#CBDF90",
      textColor: "black",
    };
  });

  if (props.tasks.todos) {
    var todoDeadlineArray = props.tasks.todos.map((todo) => {
      return {
        id: createEventId(),
        title: `Finish ${todo.content}`,
        start: `${todo.due_date}`.replace(/T.*$/, ""),
        backgroundColor: "#4D7C8A",
      };
    });
  } else {
    todoDeadlineArray = [];
  }

  if (props.tasks.challenges) {
    var challengeEventArray = props.tasks.challenges.map((challenge) => {
      return {
        id: createEventId(),
        title: `Finish ${challenge.name}`,
        start: `${challenge.due_date}`.replace(/T.*$/, ""),
        backgroundColor: "#7F9C96",
      };
    });
  } else {
    challengeEventArray = [];
  }

  if (props.events) {
    var otherEventArray = props.events.map((event) => {
      return {
        id: event.event_id,
        category: "other",
        title: `${event.title}`,
        start: `${event.date}`.replace(/T.*$/, ""),
        backgroundColor: "#c0d6df",
        textColor: "black",
      };
    });
  }

  var deadlineArray = [...challengeEventArray, ...todoDeadlineArray];

  var eventArray = [
    deadlineArray,
    jobEventArray,
    jobsAddedArray,
    otherEventArray,
  ];

  /********/

  //View Options
  const displayEvents = () => {
    let eventsToDisplay = [];
    if (props.user.calendar_settings) {
      var activeEventItems = [
        props.user.calendar_settings.see_deadlines,
        props.user.calendar_settings.see_applied,
        props.user.calendar_settings.see_added,
        props.user.calendar_settings.see_other,
      ];

      //Test eventArray against active settings in DB
      for (let i = 0; i < eventArray.length; i++) {
        for (let k = 0; k < activeEventItems.length; k++) {
          if (activeEventItems[i]) {
            eventsToDisplay.push(eventArray[i]);
          }
        }
      }
    }

    //Filter out loop duplicates
    let uniqueArray = eventsToDisplay.filter(function (item, pos) {
      return eventsToDisplay.indexOf(item) == pos;
    });

    //Combine arrays into one
    setCalEvents([].concat(...Object.values(uniqueArray)));

    if (props.user.calendar_settings && props.user.calendar_settings.see_all) {
      setCalEvents([
        ...eventArray[0],
        ...eventArray[1],
        ...eventArray[2],
        ...eventArray[3],
      ]);
    }
  };

  useEffect(() => {
    displayEvents();
  }, [seeAllEvents, props.user.calendar_settings]);

  // const renderSidebar = () => {
  //   return (
  //     <div className="demo-app-sidebar">
  //       <div className="demo-app-sidebar-section">
  //         {/* <h2>Instructions</h2>
  //         <ul>
  //           <li>Select dates and you will be prompted to create a new event</li>
  //           <li>Drag, drop, and resize events</li>
  //           <li>Click an event to delete it</li>
  //         </ul> */}
  //       </div>

  //       <div className="demo-app-sidebar-section">
  //         {/* <h2>All Events ({currentEvents.length})</h2> */}
  //         {/* <ul>{currentEvents.map(renderSidebarEvent)}</ul> */}

  //       </div>
  //     </div>
  //   );
  // };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const removeEvent = (clickInfo) => {
    clickInfo.event.remove();
    props.deleteEvent(clickInfo.event._def.publicId);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (clickInfo.event.extendedProps.category === "other") {
      confirmDelete("Event", removeEvent, clickInfo);
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  function renderEventContent(eventContent: EventContentArg) {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  }

  function renderSidebarEvent(event: EventApi) {
    // return (
    //   <li key={event.id}>
    //     <b>
    //       {formatDate(event.start!, {
    //         year: "numeric",
    //         month: "short",
    //         day: "numeric",
    //       })}
    //     </b>
    //     <i>{event.title}</i>
    //   </li>
    // );
  }

  return (
    <div className="demo-app">
      {/* {renderSidebar()} */}
      <button
        style={{
          background: "none",
          border: "none",
          outline: "0",
          marginBottom: "20px",
        }}
        onClick={() => toggleMenu(!menu)}
      >
        <ToggleMenu src={menu ? upArrow : downArrow}></ToggleMenu>
        {menu ? "Hide View Options" : "Show View Options"}
      </button>
      {menu ? (
        <Flex>
          <CalendarOptions user={props.user} getUser={props.getUser} />
        </Flex>
      ) : null}

      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          height="600px"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={
            props.user.calendar_settings &&
            props.user.calendar_settings.see_weekends
              ? props.user.calendar_settings.see_weekends
              : null
          }
          events={calEvents}
          // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
};

export default CalendarComp;
