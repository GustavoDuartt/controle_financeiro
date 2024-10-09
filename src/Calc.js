import React from 'react';

const ResumoFinanceiro = ({ entradasSaidas }) => {
  const calcularEntradas = () => {
    return entradasSaidas
      .filter(item => item.tipo === 'entrada')
      .reduce((total, item) => total + item.valor, 0);
  };

  const calcularSaidas = () => {
    return entradasSaidas
      .filter(item => item.tipo === 'saida')
      .reduce((total, item) => total + item.valor, 0);
  };

  const total = calcularEntradas() - calcularSaidas();

  return (
    <div className="resumo">
      <section className="entradas">
        <div className="texto">
          <p>Entradas</p>
          <img src="https://cdn-icons-png.flaticon.com/128/7604/7604801.png" alt="Entradas" />
        </div>
        <h2>{calcularEntradas()}</h2>
      </section>
      <section className="saidas">
        <div className="texto">
          <p>Saídas</p>
          <img id="imgSaida" src="https://cdn-icons-png.flaticon.com/128/7604/7604801.png" alt="Saídas" />
        </div>
        <h2>{calcularSaidas()}</h2>
      </section>
      <section className="total">
        <div className="texto">
          <p>Total</p>
          <img src="https://cdn-icons-png.flaticon.com/128/3133/3133460.png" alt="Total" />
        </div>
        <h2>{total}</h2>
      </section>
    </div>
  );
};

export default ResumoFinanceiro;
