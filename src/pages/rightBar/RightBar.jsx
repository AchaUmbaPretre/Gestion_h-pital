import React from 'react'
import './rightBar.scss'
import Statistique from '../../components/statistique/Statistique'
import ListeDocteur from '../../components/listeDocteur/ListeDocteur'
import ChartRond from '../../components/chartjs/ChartRond'

const RightBar = () => {
  return (
    <>
        <div className="rightbar">
          <Statistique />
          <div className="rightbar-wrapper">
            <ListeDocteur />
            <ChartRond />
          </div>
        </div>
      
    </>
  )
}

export default RightBar
