import React from 'react'

const Admission = () => {
  
  return (
    <>
      <div className="listeDocteur">
        <div className="listeDocteur-top">
          <h2 className="listeDocteur-h2">Liste des docteurs</h2>
          <div className="listeDocteur-title">
            <Input.Search />
          </div>
        </div>
        <div className="listeDocteur-content">
          {loading ? (
            <Skeleton active />
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Admission
