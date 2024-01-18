import React, { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientItem from './components/Patient'


function App() {

  const [patientList, setPatientList] = useState([{}])

  const [id, setId] = useState('')
  const [confusion, setConfusion] = useState('')
  const [bunValue, setBunValue] = useState('')
  const [respiratoryRate, setRespiratoryRate] = useState('')
  const [systolicBP, setSystolicBP] = useState('')
  const [dob, setDob] = useState('')


  const [search, setSearch] = useState('')


  useEffect(() => {
    axios.get('http://localhost:8000/patient')
      .then(res => {
        setPatientList(res.data)
      })
  }, []);


  // create a patient
  const addPatientHandler = () => {
    axios.post('http://localhost:8000/patient/', { 'id': id, 'confusion': confusion, 'bunValue': bunValue, 'respiratoryRate':respiratoryRate, 'systolicBP':systolicBP,'dob':dob })
      .then(res => console.log(res))
  };



  return (
    <div className="App list-group-item  justify-content-center align-items-center mx-auto" style={{"width":"600px", "backgroundColor":"white", "marginTop":"15px"}} >

      <div className="card-body">

        <h5 className="card text-white bg-primary mb-3">Add Patient</h5>
        <span className="card-text">

          <input className="mb-2 form-control titleIn" onChange={event => setId(event.target.value)} placeholder='Id'/>
          <input className="mb-2 form-control desIn" onChange={event => setConfusion(event.target.value)}   placeholder='confusion'/>
          <input className="mb-2 form-control desIn" onChange={event => setBunValue(event.target.value)}   placeholder='bunValue'/>
          <input className="mb-2 form-control desIn" onChange={event => setRespiratoryRate(event.target.value)}   placeholder='respiratoryRate'/>
          <input className="mb-2 form-control desIn" onChange={event => setSystolicBP(event.target.value)}   placeholder='systolicBP'/>
          <input className="mb-2 form-control desIn" onChange={event => setDob(event.target.value)}   placeholder='Dob'/>

          <button className="btn btn-outline-primary mx-2 mb-3" style={{'borderRadius':'50px',"font-weight":"bold"}}  onClick={addPatientHandler}>Add</button>
        </span>

        <div>
          <div>
            <input type='text' placeholder='search' onChange={(e) => setSearch(e.target.value)} />
            {
              patientList.filter((item) => {
                console.log("search="+search+", item,id="+item.id+", ==="+(item.id === search))
                if(search===""){
                  return item
                }else if(item.id === search){
                  return item
                }else{
                  return []
                }
              }).map( p => {
                return <PatientItem patient={p} />
              })
            }

        </div>
        </div>

      </div>

    </div>
  );
}

export default App;