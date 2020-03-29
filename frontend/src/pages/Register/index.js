import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'

export default function Register(){
      
      const [name,setName] = useState('');
      const [email,setEmail] = useState('');
      const [telemovel,setTelemovel] = useState('');
      const [city,setCity] = useState('');
      const [codigopostal,setCodigopostal] = useState('');

      const history = useHistory();

      async function handleRegister(e){
        e.preventDefault();

        const data = {
          name,
          email,
          telemovel,
          city,
          codigopostal
        };

        try{

        const response = await api.post('ongs',data);
        alert(`Seu Id de acesso é ${response.data.id}`);
        history.push('/');

        } catch(err){

          alert('Erro no cadastro, tente novamente')
        }
      }

  return(
    <div className="register-container">
     
      <div className="content">
        <section>
          <img src={logoImg} alt=""/>
          <h1>Cadastro</h1>
          <p>Faça o seu cadastro na plataforma e ajude pessoas a encontrarem caso da sua ONG</p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para Logon
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
          placeholder="O nome da ONG"
          value={name}
          onChange= {e => setName(e.target.value)}
          />
          <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
          <input 
          placeholder="Telemóvel"
          value={telemovel}
          onChange={e => setTelemovel(e.target.value)}
          />
          <div className="input-group">
            <input 
            placeholder="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
            />
            <input 
            placeholder="CP" 
            style={{width:80}}
            value={codigopostal}
            onChange={e => setCodigopostal(e.target.value)}/>
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>

    </div>
  );
  

}
