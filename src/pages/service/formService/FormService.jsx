import React from 'react'

const FormService = () => {
  return (
    <>
      <div className="docteurForm">
        <h2 className="docteur-h2">Service</h2>
        <div className="docteurForm-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="docteur-rows">
            <label htmlFor="" className="docteur-label">Nom service</label>
            <input type="text" name='nomService' className="docteur-input" />
          </div>

          <div className="docteur-rows">
            <label htmlFor="" className="docteur-label">Description</label>
            <input type="text" name='description' className="docteur-input" />
          </div>
        </div>
        <button className="docteur-btn">Engistrer</button>
      </div>
    </>
  )
}
export default FormService
