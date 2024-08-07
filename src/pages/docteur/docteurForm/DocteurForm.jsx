import React from 'react'
import './docteurForm.scss'

const DocteurForm = () => {
  return (
    <>
      <div className="docteurForm">
        <h2 className="docteur-h2">Docteur</h2>
        <div className="docteurForm-wrapper">
          <div className="docteur-rows">
            <label htmlFor="" className="docteur-label">Nom</label>
            <input type="text" className="docteur-input" />
          </div>

          <div className="docteur-rows">
            <label htmlFor="" className="docteur-label">Prenom</label>
            <input type="text" className="docteur-input" />
          </div>

          <div className="docteur-rows">
            <label htmlFor="" className="docteur-label">Specialité</label>
            <input type="text" className="docteur-input" />
          </div>

          <div className="docteur-rows">
            <label htmlFor="" className="docteur-label">Telephone</label>
            <input type="text" className="docteur-input" />
          </div>

          <div className="docteur-rows">
            <label htmlFor="" className="docteur-label">Email</label>
            <input type="text" className="docteur-input" />
          </div>

          <div className="docteur-rows">
            <label htmlFor="" className="docteur-label">Adresse</label>
            <input type="text" className="docteur-input" />
          </div>

          <div className="docteur-rows">
            <label htmlFor="" className="docteur-label">Image</label>
            <input type="file" className="docteur-inputs" />
          </div>
        </div>
        <button className="docteur-btn">Engistrer</button>
      </div>
    </>
  )
}

export default DocteurForm
