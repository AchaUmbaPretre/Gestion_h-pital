import React, { useEffect, useState } from 'react';
import {
    UserOutlined,
    ArrowRightOutlined,
    RiseOutlined,
    DashOutlined,
    FileTextOutlined,
    FunnelPlotOutlined,
    HomeOutlined,
    FormOutlined,
    MedicineBoxOutlined
} from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './statistique.scss';
import { getPatientCount } from '../../services/patientService';
import { notification } from 'antd';
import { getDocteurCount } from '../../services/docteurService';
import { getConsultationCount } from '../../services/consultservice';

// Enregistrer les composants de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Statistique = () => {
  const [patient, setPatient] = useState([]);
  const [docteur, setDocteur] = useState([]);
  const [consultation, setConsultation] = useState([]);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Over Time',
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ patientResponse, docteurResponse, consultationResponse ] = await Promise.all([
          getPatientCount(),
          getDocteurCount(),
          getConsultationCount()
        ]);

        setPatient(patientResponse?.data[0].nbre_patient);
        setDocteur(docteurResponse?.data[0].nbre_docteur);
        setConsultation(consultationResponse.data[0].nbre_consultation)


      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      } finally {
/*         setLoading(false); */
      }
    };

    fetchData();
  }, []);

  console.log(docteur)
  return (
    <>
      <div className="statistique">
        <div className="statistique-top">
          <div className="statistique-left">
            <HomeOutlined className='icon'/>
            <div className="statistique-title">
              <h2 className="statistiques-h1">Accueil</h2>
            </div>
          </div>
          <div className="statistique-right">
            <div className="stat-filtre">
              <FunnelPlotOutlined className='icon-filter' />
              <span className="stat-span">Filtre</span>
            </div>
            <div className="stat-filtre">
              <FileTextOutlined className='icon-filter'/>
              <span className="stat-span">Export</span>
            </div>
          </div>
        </div>
        <div className="statistique-center">
          <div className="statistique-center-left">
            <div className="statistique-row">
              <div className="statistique-row-top">
                <div className="stat">
                  <div className="stat-icon">
                    <UserOutlined />
                  </div>
                  <span className="stat-title">Patients</span>
                </div>
                <div className="statistique-trait">
                  <DashOutlined />
                </div>
              </div>
              <div className="statistique-row-center">
                <h2 className="stat-h2">{patient}</h2>
                <div className="statistique-row-center-top">
                  <span className="statistique-count"><RiseOutlined className='icon'/>1000</span>
                  <span className="statistique-count-desc">+10</span>
                </div>
              </div>
              <div className="statistique-row-bottoms">
                <hr />
                <div className="stat-detail-rows">
                  <span className='stat-detail'>Voir le detail</span>
                  <ArrowRightOutlined className='stat-icon' />
                </div>
              </div>
            </div>
            <div className="statistique-row">
              <div className="statistique-row-top">
                <div className="stat">
                  <div className="stat-icon">
                    <UserOutlined />
                  </div>
                  <span className="stat-title">Personnels</span>
                </div>
                <div className="statistique-trait">
                  <DashOutlined />
                </div>
              </div>
              <div className="statistique-row-center">
                <h2 className="stat-h2">{docteur}</h2>
                <div className="statistique-row-center-top">
                  <span className="statistique-count"><RiseOutlined className='icon'/>1000</span>
                  <span className="statistique-count-desc">+10</span>
                </div>
              </div>
              <div className="statistique-row-bottoms">
                <hr />
                <div className="stat-detail-rows">
                  <span className='stat-detail'>Voir le detail</span>
                  <ArrowRightOutlined className='stat-icon' />
                </div>
              </div>
            </div>
            <div className="statistique-row">
              <div className="statistique-row-top">
                <div className="stat">
                  <div className="stat-icon">
                    <FormOutlined />
                  </div>
                  <span className="stat-title">Consultations</span>
                </div>
                <div className="statistique-trait">
                  <DashOutlined />
                </div>
              </div>
              <div className="statistique-row-center">
                <h2 className="stat-h2">{consultation}</h2>
                <div className="statistique-row-center-top">
                  <span className="statistique-count"><RiseOutlined className='icon'/>000</span>
                  <span className="statistique-count-desc">+10</span>
                </div>
              </div>
              <div className="statistique-row-bottoms">
                <hr />
                <div className="stat-detail-rows">
                  <span className='stat-detail'>Voir le detail</span>
                  <ArrowRightOutlined className='stat-icon' />
                </div>
              </div>
            </div>
            <div className="statistique-row">
              <div className="statistique-row-top">
                <div className="stat">
                  <div className="stat-icon">
                    <MedicineBoxOutlined />
                  </div>
                  <span className="stat-title">Médicaments</span>
                </div>
                <div className="statistique-trait">
                  <DashOutlined />
                </div>
              </div>
              <div className="statistique-row-center">
                <h2 className="stat-h2">50</h2>
                <div className="statistique-row-center-top">
                  <span className="statistique-count"><RiseOutlined className='icon'/>1000%</span>
                  <span className="statistique-count-desc">+10</span>
                </div>
              </div>
              <div className="statistique-row-bottoms">
                <hr />
                <div className="stat-detail-rows">
                  <span className='stat-detail'>Voir le detail</span>
                 <ArrowRightOutlined className='stat-icon' />
                </div>
              </div>
            </div>
          </div>
          <div className="statistique-center-right">
            <div className="statistique-center-right-top">
              <div className="statistique-wrapper1">
                <span className="stat_span-title">Revenu</span>
                <div className="stat_center-row"></div>
              </div>
              <div className="statistique-wrapper2">
                <div className="statistique-montant-rows">
                  <h2 className="stat_span_montant">1000</h2>
                  <div className="statistique-asc">+10%</div>
                </div>
                <div className="statistique-montant-rows2">
                  <div className="stat_rows">
                    <span className="rond"></span>
                    <span className="span-desc">Pharmacie</span>
                  </div>
                  <div className="stat_rows">
                    <span className="rond"></span>
                    <span className="span-desc">Laboratoire</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistique-center-right-bottom">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistique;
