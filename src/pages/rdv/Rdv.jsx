import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Tabs, Table, notification } from 'antd';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import './rdv.scss';
import ListeRdv from './listeRdv/ListeRdv';
import { getRdv } from '../../services/rdvService';

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
  const [datas, setDatas] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRdv();
        const rdvs = response.data;

        // Transformation des données pour le calendrier
        const events = rdvs.map(rdv => ({
          title: `${rdv.type_rendezvous} - ${rdv.nom_patient}`,
          start: new Date(`${rdv.date_rdv.split('T')[0]}T${rdv.heure_debut}`),
          end: new Date(`${rdv.date_rdv.split('T')[0]}T${rdv.heure_fin}`),
        }));

        setEvents(events);
        setLoading(false);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
        setLoading(false);
      }
    };

    fetchData();
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
