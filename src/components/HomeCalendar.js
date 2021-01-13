import React from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-US");
const localizer = momentLocalizer(moment);

class HomeCalendar extends React.Component {

    render() {
        return (
            <div style={{height: "100%"}}>
            <Calendar
                localizer={localizer}
                events={[
                    {
                    title: "My event",
                    allDay: true,
                    start: new Date(2021, 0, 14), // 10.00 AM
                    end: new Date(2021, 0, 14) // 2.00 PM
                    }
                ]}
                // step={5}
                // timeslots={3}
                view="month"
                views={["month"]}
                // min={new Date(2020, 0, 1, 8, 0)} // 8.00 AM
                // max={new Date(2020, 0, 1, 17, 0)} // Max will be 6.00 PM!
                date={new Date(2021, 0, 1)}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: "15%", height: 500 }}
            />
            </div>
        )
    }
}

export default HomeCalendar