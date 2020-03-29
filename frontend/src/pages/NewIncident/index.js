import React,{ useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft}  from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  
  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try
    {
      await api.post('incidents',data, {
        headers:{
          Authorization:ongId
        }
      });
      
      history.push('/profile');

    }catch(e){
      alert('Erro ao cadastrar')
    }
  }


  return(
    <div className="new-incident-container">

      <div className="content">
        <section>
          <img src={logoImg} alt=""/>
          <h1>Cadastrar novo caso</h1>
          <p>Detalhe o caso com os pormenores que quiser para poder ter a melhor ajuda possivel</p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>
        <form >
          <input 

          placeholder="Título do caso"
          value={title}
          onChange={e=> setTitle(e.target.value)}
          />
          <textarea 
          placeholder="Descrição"
          value={description}
          onChange={e=> setDescription(e.target.value)}
          />
          <input 
          placeholder="Valor em euros"
          value={value}
          onChange={e=> setValue(e.target.value)}
          />

          <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>
        </form>
      </div>

    </div>
  );
}
