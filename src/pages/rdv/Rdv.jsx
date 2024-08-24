import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Tabs, Table } from 'antd';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import './rdv.scss';
import ListeRdv from './listeRdv/ListeRdv';

const { TabPane } = Tabs;

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/rdv')
      .then(response => {
        const formattedEvents = response.data.map(rdv => ({
          key: rdv.id_rdv,
          title: rdv.motif_rdv,
          start: new Date(rdv.date_rdv),
          end: new Date(new Date(rdv.date_rdv).getTime() + 60 * 60 * 1000), 
          allDay: false,
          patient: rdv.patient_name, // Assuming you have patient data
        }));
        setEvents(formattedEvents);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'Motif du Rendez-vous',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
    },
    {
      title: 'Date et Heure',
      dataIndex: 'start',
      key: 'start',
      render: (text, record) => (
        <span>{format(record.start, 'dd/MM/yyyy HH:mm')}</span>
      ),
    },
  ];

  return (
    <div className="rdv">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Voir la Liste des Rendez-vous" key="1">
          <ListeRdv/>
        </TabPane>
        <TabPane tab="Voir le Calendrier des Rendez-vous" key="2">
          <div style={{ height: '500px' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Rdv;
