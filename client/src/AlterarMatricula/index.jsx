import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
export default function UpdateMatricula() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [empresa, setEmpresa] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atualizacao = { nome, valor, empresa };

    try {
      const response = await fetch(`http://localhost:5000/jogos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atualizacao),
      });
      if (response.ok) {
        alert('Jogo atualizado com sucesso!');
        navigate("/jogos");
      } else {
        alert('Erro ao atualizar jogo.');
      }
    } catch (error) {
      console.error('Erro ao atualizar jogo:', error);
    }
  };

  return (
    <>
    <Header/>
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Atualizar Jogo</h2>
      <input
        type="text"
        placeholder="ID do Jogo"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
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
      <button type="submit">Atualizar Jogo</button>
    </form>
    </div>
    <Footer/>
    </>
  );
}
