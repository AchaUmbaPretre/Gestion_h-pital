import React from 'react'
import './patientForm.scss'

const PatientForm = () => {
  return (
    <>
      <div className="patientForm">
        <div className="patient-wrapper">
          <div className="patient-left">
            <h2 className="patient-h2">Information Generale</h2>
            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Nom <span>*</span></label>
              <input type="text" className="patient-input" name='nom' placeholder='Entrez le nom....' />
            </div>

            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Prenom <span>*</span></label>
              <input type="text" className="patient-input" name='prenom' placeholder='Entrez le prenom....' />
            </div>

            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Sexe <span>*</span></label>
              <input type="text" className="patient-input" name='sexe' placeholder='Entrez le sexe....' />
            </div>

            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Date de naissance <span>*</span></label>
              <input type="date" className="patient-input" name='dateNaissance' placeholder='Entrez le nom....' />
            </div>

            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Lieu de naissance <span>*</span></label>
              <input type="text" name='lieuNaissance' className="patient-input" />
            </div>

          </div>
          <div className="patient-left">
            <h2 className="patient-h2">Adresse</h2>
            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Province <span>*</span></label>
              <input type="text" name='province' className="patient-input" />
            </div>

            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Adresse <span>*</span></label>
              <input type="text" className="patient-input" name='adresse' placeholder="Entrez l'adresse...." />
            </div>

            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Tel mobile <span>*</span></label>
              <input type="tel" className="patient-input" name='tel' placeholder='+243' />
            </div>

            <div className="patient-rows">
              <label htmlFor="email" className="patient-label">Email <span>*</span></label>
              <input type="text" className="patient-input" name='email' placeholder='Entrez le mail....' />
            </div>
          </div>

          <div className="patient-left">
            <h2 className="patient-h2">Assurance</h2>
            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Société du patient <span>*</span></label>
              <input type="text" name='societePatient' className="patient-input" placeholder='Entrez le nom....' />
            </div>

            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Assurance <span>*</span></label>
              <input type="text" name='assurance' className="patient-input" placeholder='Entrez le nom....' />
            </div>
          </div>

          <div className="patient-left">
            <h2 className="patient-h2">Autres</h2>
            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Profession <span>*</span></label>
              <input type="text" name='profession' className="patient-input" placeholder='Entrez le nom....' />
            </div>

            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Type patient <span>*</span></label>
              <input type="text" name='typePatient' className="patient-input" placeholder='Entrez le nom....' />
            </div>

            <div className="patient-rows">
              <label htmlFor="" className="patient-label">Groupe sanguin <span>*</span></label>
              <input type="text" name='groupeSang' className="patient-input" placeholder='Entrez le nom....' />
            </div>
          </div>
        </div>
        <button className="button-patient">Enregistrer</button>
      </div>
    </>
  )
}

export default PatientForm
