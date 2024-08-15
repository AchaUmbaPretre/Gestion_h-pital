import React from 'react'
import './rightBar.scss'
import Statistique from '../../components/statistique/Statistique'
import ChartRond from '../../components/chartjs/ChartRond'
import ListeDocteur from '../docteur/ListeDocteur/ListeDocteur'

const RightBar = () => {
  return (
    <>
        <div className="rightbar">
          <Statistique />
          <div className="rightbar-wrapper">
            <ListeDocteur/>
            <ChartRond />
          </div>
        </div>
      
    </>
  )
}

export default RightBar
