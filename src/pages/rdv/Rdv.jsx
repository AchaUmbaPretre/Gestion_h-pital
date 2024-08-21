import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import './rdv.scss'


const locales = {
  'en-US': require('date-fns/locale/en-US'),
  // Ajoutez d'autres locales si nécessaire
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Rdv = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/rdv')
      .then(response => {
        const formattedEvents = response.data.map(rdv => ({
          title: rdv.motif_rdv,
          start: new Date(rdv.date_rdv),
          end: new Date(new Date(rdv.date_rdv).getTime() + 60 * 60 * 1000), 
          allDay: false
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      });
  }, []);

  return (
    <div className="rdv" style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default Rdv;
