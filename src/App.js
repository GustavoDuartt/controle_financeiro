import React, { useState } from 'react';
import ResumoFinanceiro from './Calc';
import './App.css';

function App() {
  const [entradasSaidas, setEntradasSaidas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [indexEdicao, setIndexEdicao] = useState(null);

  const adicionarRegistro = () => {
    if (descricao && valor && tipo) {
      setEntradasSaidas([...entradasSaidas, { descricao, valor: Number(valor), tipo }]);
      setDescricao('');
      setValor('');
      setTipo('');
    }
  };

  const excluirRegistro = (index) => {
    const novosRegistros = entradasSaidas.filter((_, i) => i !== index);
    setEntradasSaidas(novosRegistros);
  };

  const iniciarEdicao = (index) => {
    const item = entradasSaidas[index];
    setDescricao(item.descricao);
    setValor(item.valor);
    setTipo(item.tipo);
    setIndexEdicao(index);
  };

  const atualizarRegistro = () => {
    if (descricao && valor && indexEdicao !== null) {
      const novosRegistros = entradasSaidas.map((item, i) => {
        if (i === indexEdicao) {
          return { ...item, descricao, valor: Number(valor), tipo };
        }
        return item;
      });
      setEntradasSaidas(novosRegistros);
      setDescricao('');
      setValor('');
      setTipo('');
      setIndexEdicao(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Controle financeiro</h1>
      </header>
    
      <ResumoFinanceiro entradasSaidas={entradasSaidas} />

      <div className="form">
        <label htmlFor="Desc">Descrição</label>
        <input
          id="Desc"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label htmlFor="Valor">Valor</label>
        <input
          id="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <div id="radios">
          <input
            type="radio"
            name="EntradaSaida"
            value="entrada"
            id="Entrada"
            checked={tipo === 'entrada'}
            onChange={() => setTipo('entrada')}
          />
          <label>Entrada</label>
        </div>

        <div id="radios">
          <input
            type="radio"
            name="EntradaSaida"
            value="saida"
            id="Saida"
            checked={tipo === 'saida'}
            onChange={() => setTipo('saida')}
          />
          <label>Saída</label>
        </div>

        <button onClick={adicionarRegistro}>ADICIONAR</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {entradasSaidas.map((item, index) => (
            <tr key={index}>
              <td>{item.descricao}</td>
              <td>{item.valor}</td>
              <td className={item.tipo === 'entrada' ? 'entrada' : 'saida'}>{item.tipo}</td>
              <td>
                {indexEdicao === index ? (
                  <>
                    <button onClick={atualizarRegistro}>Atualizar</button>
                  </>
                ) : (
                  <>
                    <button id="editar" onClick={() => iniciarEdicao(index)}>Editar</button>
                    <button id="excluir" onClick={() => excluirRegistro(index)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
