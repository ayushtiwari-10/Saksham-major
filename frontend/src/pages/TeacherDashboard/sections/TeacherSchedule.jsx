import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { authService } from "../../../services/auth.service";
import "./TeacherSchedule.css";

const sampleEvents = {
  // keyed by ISO date (yyyy-mm-dd)
  "2025-08-26": [
    { id: "e1", time: "07:00 AM", title: "Morning Class-1" },
    { id: "e2", time: "09:00 AM", title: "Morning Class-2" },
    { id: "e3", time: "12:30 PM", title: "Baking Workshop" },
  ],
  "2025-08-27": [
    { id: "e4", time: "10:00 AM", title: "Knitting Basics" },
    { id: "e5", time: "06:00 PM", title: "Live Q&A" },
  ],
};

const pad = (n) => (n < 10 ? "0" + n : n);

function isoDate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const TeacherSchedule = () => {
  const navigate = useNavigate();
  const [activeSection] = useState("Schedule");
  const [today, setToday] = useState(new Date());
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const response = await authService.get('/teacher/schedule');
        // Response is { success: true, message, data: events }
        const eventsArray = response.data || [];
        const eventsByDate = {};
        eventsArray.forEach(event => {
          if (!eventsByDate[event.date]) eventsByDate[event.date] = [];
          eventsByDate[event.date].push({ id: event.id, time: event.time, title: event.title });
        });
        setEvents(eventsByDate);
        setError(null);
      } catch (err) {
        setError('Failed to load schedule');
        console.error('Error fetching schedule:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleNavigate = (section) => {
    const routes = {
      "Dashboard": "/teacher/dashboard",
      "My Videos": "/teacher/dashboard/videos",
      "Schedule": "/teacher/dashboard/schedule",
      "ChatBox": "/teacher/dashboard/chatbox",
      "Finances": "/teacher/dashboard/finances"
    };
    navigate(routes[section] || "/teacher/dashboard");
  };



  const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  const firstWeekday = (y, m) => new Date(y, m, 1).getDay(); // 0 = Sun

  const handlePrevMonth = () => {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  };

  const selectDate = (d) => {
    setToday(d);
  };

  const addEvent = async () => {
    // simple prompt demo
    const title = prompt("Enter event title");
    const time = prompt("Enter time (e.g., 07:00 AM)");
    if (!title || !time) return;
    try {
      const response = await authService.post('/teacher/schedule', {
        date: isoDate(today),
        time,
        title,
      });
      // Response is { success: true, message, data: { id, date, time, title } }
      const newEvent = { id: response.data.id, time, title };
      const key = isoDate(today);
      setEvents(prev => ({
        ...prev,
        [key]: prev[key] ? [newEvent, ...prev[key]] : [newEvent]
      }));
    } catch (err) {
      console.error('Error adding event:', err);
      alert('Failed to add event');
    }
  };

  const selectedKey = isoDate(today);
  const todaysEvents = events[selectedKey] || [];

  // build month grid
  const year = month.getFullYear();
  const mIndex = month.getMonth();
  const totalDays = daysInMonth(year, mIndex);
  const startWeekday = firstWeekday(year, mIndex);

  const monthDays = [];
  for (let i = 0; i < startWeekday; i++) monthDays.push(null);
  for (let d = 1; d <= totalDays; d++) monthDays.push(new Date(year, mIndex, d));

  // week grid mock data for right column (simple visual)
  const weekDates = (() => {
    const base = new Date(today);
    const start = new Date(base);
    start.setDate(base.getDate() - base.getDay()); // sunday
    const arr = [];
    for (let i = 0; i < 7; i++) {
      const dd = new Date(start);
      dd.setDate(start.getDate() + i);
      arr.push(dd);
    }
    return arr;
  })();

  return (
    <div className="teacher-root">
      <Sidebar active={activeSection} onNavigate={handleNavigate} />
      <div className="teacher-main">
        <Topbar title="Schedule" />

        <div className="schedule-content">
          {/* LEFT - mini calendar */}
          <aside className="mini-calendar">
            <div className="cal-header">
              <button onClick={handlePrevMonth} className="cal-nav">‹</button>
              <div className="cal-title">
                {month.toLocaleString(undefined, { month: "long" })} {month.getFullYear()}
              </div>
              <button onClick={handleNextMonth} className="cal-nav">›</button>
            </div>

            <div className="cal-grid">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((w)=> <div key={w} className="cal-weekday">{w.slice(0,1)}</div>)}
              {monthDays.map((d, idx) => {
                const isToday = d && isoDate(d) === isoDate(new Date());
                const isSelected = d && isoDate(d) === selectedKey;
                const hasEvents = d && events[isoDate(d)] && events[isoDate(d)].length > 0;
                return (
                  <div
                    key={idx}
                    className={`cal-cell ${isToday? "today":""} ${isSelected? "selected":""} ${hasEvents? "has-events":""}`}
                    onClick={() => d && selectDate(d)}
                  >
                    {d ? d.getDate() : ""}
                  </div>
                );
              })}
            </div>

            <div className="mini-actions">
              <button className="btn small" onClick={() => setToday(new Date())}>Today</button>
              <button className="btn small" onClick={addEvent}>Add Event</button>
            </div>
          </aside>

          {/* CENTER - timeline / today's schedule */}
          <section className="timeline">
            <div className="timeline-header">
              <h3>{today.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</h3>
              <div>
                <button className="btn" onClick={addEvent}>+ Add</button>
              </div>
            </div>

            <div className="timeline-list">
              {loading && <div className="loading">Loading schedule...</div>}
              {error && <div className="error">{error}</div>}
              {!loading && !error && todaysEvents.length === 0 && <div className="empty">No classes scheduled for this day.</div>}
              {!loading && !error && todaysEvents.map(ev => (
                <div className="time-item" key={ev.id}>
                  <div className="time-left">{ev.time}</div>
                  <div className="time-body">
                    <div className="time-title">{ev.title}</div>
                    <div className="time-controls">
                      <button className="tiny">Edit</button>
                      <button className="tiny danger" onClick={() => {
                        setEvents(prev => {
                          const next = {...prev};
                          next[selectedKey] = next[selectedKey].filter(x=>x.id !== ev.id);
                          return next;
                        });
                      }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT - week view grid mock */}
          <aside className="week-grid">
            <div className="week-header">
              <div className="mini-search"><input placeholder="Search your class" /></div>
              <div className="date-quick">{new Date().toLocaleDateString()}</div>
            </div>

            <div className="week-grid-inner">
              <div className="week-days">
                {weekDates.map((d) => (
                  <div key={d.toISOString()} className="week-day-col">
                    <div className="week-day-title">{d.toLocaleString(undefined, { weekday: "short" })} {d.getDate()}</div>
                    <div className="day-events">
                      {/* render events if present for that day */}
                      {(events[isoDate(d)] || []).map(ev => (
                        <div key={ev.id} className="week-event">{ev.time} - {ev.title}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="week-time-grid">
                {/* visual hour blocks */}
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className="hour-row">
                    <div className="hour-label">{(7 + i)}:00</div>
                    <div className="hour-slot" />
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default TeacherSchedule;
