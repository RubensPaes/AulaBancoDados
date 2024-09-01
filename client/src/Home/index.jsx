import { Link } from 'react-router-dom';
import '../globals.css';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
export default function Home() {
    return (
        <>
        <Header/>
        <div className='container'>
            <h2>Banco de Jogos</h2>
            <div className="card-container">
                <Link to="/jogo/cadastrar" className="card">
                    <div>Registrar Jogos</div>
                </Link>
                <Link to="/jogos" className="card">
                    <div>Lista de Jogos</div>
                </Link>
                <Link to="/jogos/alterar" className="card">
                    <div>Editar Jogos</div>
                </Link>
            </div>
        </div>
        <Footer/>
        </>
    );
}
