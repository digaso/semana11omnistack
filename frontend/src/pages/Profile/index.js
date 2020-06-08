import React,{ useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'
import './styles.css'
import { FiPower, FiTrash2 } from 'react-icons/fi'

export default function Profile(){
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  
  useEffect(()=>{
    api.get('profile', {
      headers:{
        Authorization:ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  },[ongId]);

  async function handleDelete(id){
    try{
       await api.delete(`incidents/${id}`,{
         headers:{
           Authorization:ongId
         }
       });

       setIncidents(incidents.filter(incident=> incident.id !== id));
    }catch(err){
      alert(err);
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/')

  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="po"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button"to="/incidents/new">Cadastrar novo caso</Link>
        <button  onClick={handleLogout } type="submit" >
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>
      <h1> Casos cadastrados</h1>

      <ul>
          {
            incidents.map(incident => (
              <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>Descrição {incident.description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-PT', { style:'currency', currency:'EUR' }).format(incident.value)}</p>

            <button onClick={()=> handleDelete(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
            ))
          }
      </ul>
    </div>
  );
}