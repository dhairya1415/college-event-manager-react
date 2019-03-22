import React from "react";

import DayDialog from "./DayDialog";
import AddEventDialog from "./AddEventDialog";
import AddReportDialog from "./AddReportDialog";
import { useCalendarEvents } from "../util/hooks";

import { Fab } from "@material-ui/core";
import { CalendarToday as CalendarIcon } from "@material-ui/icons";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

const MonthlyReportFab = (props) => {
    const month = props.date.getMonth() + 1;
    const year = props.date.getYear() + 1900;

    return (
        <Fab {...props}  
        color="primary" 
        variant="extended" 
        style={{
            position: "relative",
            bottom: "1rem",
            right: "auto",
            left: "auto",
        }}
        component='a' 
        href={`http://127.0.0.1:8000/month/${month}/${year}`}>
            <CalendarIcon />
            Monthly CSV
        </Fab>
    )
};

function Calendar() {
    const [clickEvent, setClickEvent] = React.useState(null);
    const [slotEvent, setSlotEvent] = React.useState(null);
    const [reportEvent, setReportEvent] = React.useState(null);
    // const [focusedEvent, setFocusedEvent] = React.useState(null);

    const [currentDate, setCurrent] = React.useState(new Date());
    const [currentView, setView] = React.useState('month');

    const events = useCalendarEvents();

    // -----

    const allowedViews = [
        BigCalendar.Views.DAY,
        BigCalendar.Views.MONTH,
        BigCalendar.Views.WEEK,
    ];

    const onSelectSlot = (e) => {
        switch (e.action) {
            case "click":
            case "doubleClick":
                setClickEvent(e);
                break;

            case "select":
                setSlotEvent(e);
                break;

            default:
                break;
        }
    };

    // -----

    return (
        <div className='calendar-container'>
            <BigCalendar
                style={{
                    height: "inherit",
                    width: "inherit",
                }}
                views={allowedViews}
                localizer={localizer}
                events={events.list}
                popup
                selectable
                onSelectSlot={onSelectSlot}
                // onSelectEvent={(event) => setFocusedEvent(event)}
                onNavigate={setCurrent}
                onView={setView}
            />

            {currentView === 'month' ? <MonthlyReportFab date={currentDate} /> : <span hidden />}

            <DayDialog
                day={clickEvent}
                onClose={() => setClickEvent(null)}
                onAddClick={() => {
                    setSlotEvent({
                        start: clickEvent.start,
                        end: clickEvent.start,
                    });
                }}
                onReport={(event) => setReportEvent(event)}
                list={events.list}
            />
            <AddEventDialog
                event={slotEvent}
                onClose={() => {
                    setSlotEvent(null);
                    events.fetchEvents();
                }}
            />
            <AddReportDialog
                event={reportEvent}
                onClose={() => {
                    setReportEvent(null);
                    setSlotEvent(null);
                }}
            />
        </div>
    );
}

export default Calendar;
