import { useState } from 'react';
import '../globals.css';
import { useNavigate } from 'react-router-dom';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
export default function CreateMatricula() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [empresa, setEmpresa] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaMatricula = { nome, valor, empresa };

    try {
      const response = await fetch('http://localhost:5000/jogos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaMatricula),
      });
      if (response.ok) {
        alert('Jogo criada com sucesso!');
        setNome('');
        setValor('');
        setEmpresa('');
        navigate("/jogos");
      } else {
        alert('Erro ao criar jogo.');
      }
    } catch (error) {
      console.error('Erro ao criar jogo:', error);
    }
  };

  return (
    <>
    <Header/>
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Criar Jogo</h2>
      <input
        type="text"
        placeholder="Nome do Jogo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        required
      />
      <button type="submit">Criar Jogo</button>
    </form>
    </div>
    <Footer/>
    </>
  );
}
