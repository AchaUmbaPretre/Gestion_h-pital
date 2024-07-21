import React from 'react';
import {
    UserOutlined,
    ArrowRightOutlined,
    RiseOutlined,
    DashOutlined
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

  return (
    <>
      <div className="statistique">
        <div className="statistique-top">
          <div className="statistique-left">
            <div className="statistique-title">
              <h1 className="statistique-h1">Accueil</h1>
            </div>
            <span className="statistique-desc">description</span>
          </div>
          <div className="statistique-right"></div>
        </div>
        <div className="statistique-center">
          <div className="statistique-center-left">
            <div className="statistique-row">
              <div className="statistique-row-top">
                <div className="stat">
                  <div className="stat-icon">
                    <UserOutlined />
                  </div>
                  <span className="stat-title">Total</span>
                </div>
                <div className="statistique-trait">
                  <DashOutlined />
                </div>
              </div>
              <div className="statistique-row-center">
                <h2 className="stat-h2">1000</h2>
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
                  <span className="stat-title">Total</span>
                </div>
                <div className="statistique-trait">
                  <DashOutlined />
                </div>
              </div>
              <div className="statistique-row-center">
                <h2 className="stat-h2">1000</h2>
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
                  <span className="stat-title">Total</span>
                </div>
                <div className="statistique-trait">
                  <DashOutlined />
                </div>
              </div>
              <div className="statistique-row-center">
                <h2 className="stat-h2">1000</h2>
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
                    <UserOutlined />
                  </div>
                  <span className="stat-title">Total</span>
                </div>
                <div className="statistique-trait">
                  <DashOutlined />
                </div>
              </div>
              <div className="statistique-row-center">
                <h2 className="stat-h2">1000</h2>
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
