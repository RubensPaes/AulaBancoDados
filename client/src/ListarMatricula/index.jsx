import { useEffect, useState } from 'react';
import '../globals.css';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
export default function ReadMatriculas() {
  const [jogos, setJogos] = useState([]);


  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        const response = await fetch('http://localhost:5000/jogos');
        const data = await response.json();
        setJogos(data);
      } catch (error) {
        console.error('Erro ao buscar as jogos:', error);
      }
    };

    fetchMatriculas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/jogos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {

        setJogos(matriculas.filter((jogo) => jogo._id !== id));
        alert('Jogo excluido com sucesso!');
      } else {
        alert('Erro ao excluir jogo.');
      }
    } catch (error) {
      console.error('Erro ao excluir jogo:', error);
    }
  };

  return (
    <>
    <Header/>
    <div className='container'>
      <h2>Lista de Jogos</h2>
      <table  className="table-container" border="1">
        <thead>
          <tr>
            <th>Código Jogo</th>
            <th>Nome do Jogo</th>
            <th>Valor</th>
            <th>Empresa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {jogos.map((jogos) => (
            <tr key={jogos._id}>
              <td>{jogos._id}</td>
              <td>{jogos.nome}</td>
              <td>{jogos.valor}</td>
              <td>{jogos.empresa}</td>
              <td>
                <button onClick={() => handleDelete(jogos._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
}
