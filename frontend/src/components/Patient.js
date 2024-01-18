
import axios from 'axios'
import React from 'react'


function PatientItem(props) {
    const deletePatientHandler = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/patient/${id}`)
        .then(res => console.log(res.data))
    }

    const getScore = (props) =>{
        let x1 = props.patient.confusion
        let x2 = props.patient.bunValue>19?1:0
        let x3 = props.patient.respiratoryRate>30?1:0
        let x4 = props.patient.systolicBP<90?1:0
        let dob_str = props.patient.dob

        let today = new Date();
        let birthDate = new Date(dob_str);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        console.log('age',age)

        let x5 = age<65?1:0

        return x1+x2+x3+x4+x5
    }

    return (
        <div>
            <p>
                <span style={{ fontWeight: 'bold, underline', backgroundColor:getScore(props)>3?'red':getScore(props)>1?'yellow':'white' }}>patient: ({props.patient.id}, {props.patient.confusion},{props.patient.bunValue},{props.patient.respiratoryRate},{props.patient.systolicBP},{props.patient.dob}) CURB-65 score = </span>{getScore(props)}

                <button onClick={() => deletePatientHandler(props.patient.id)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>Remove</button>
                <hr></hr>
            </p>
        </div>
    )
}

export default PatientItem;