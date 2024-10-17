'use client';

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Modal from "./modal";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
export interface Rota {
  id: number,
  nome: string,
  frequencia: number,
  dataInicio: Date,
  cor: string
}

const calcularData = (dataInicio: Date, frequencia: number): Date[] => {
  const datas: Date[] = []
  let dataAtual = new Date(dataInicio)
  let i = 0;
  while (i < 52) {
    const diaDaSemana = dataAtual.getDay();
    if (diaDaSemana === 0) {
      dataAtual.setDate(dataAtual.getDate() + 1)
      continue
    } else if (diaDaSemana === 6) {
      dataAtual.setDate(dataAtual.getDate() + 2)
      continue
    }
    datas.push(new Date(dataAtual));
    dataAtual.setDate(dataAtual.getDate() + frequencia);
    i++;
  }
  return datas
}

const Home: React.FC = () => {
  const [rotas, setRotas] = useState<Rota[]>([])
  const [datasRotas, setDatasRotas] = useState<{ nome: string; datas: Date[]; cor: string }[]>([])
  const [datasMarcadas, setDatasMarcadas] = useState<Date[]>([])
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const adicionarRota = (novaRota: Rota) => {
    setRotas(prevRotas => [...prevRotas, novaRota])
  }

  const calcularTodasDatas = () => {
    const novasDatas = rotas.map(rota => ({
      nome: rota.nome,
      datas: calcularData(rota.dataInicio, rota.frequencia),
      cor: rota.cor
    }))

    setDatasRotas(novasDatas)
    const todasDatasMarcadas = novasDatas.flatMap(rota => rota.datas)
    setDatasMarcadas(todasDatasMarcadas)
  }

  const tileContent = ({ date }: { date: Date }) => {
    const markedRotaNames = datasRotas
      .filter(rota => rota.datas.some(d => d.toDateString() === date.toDateString()))
      .map(rota => ({ nome: rota.nome, cor: rota.cor }))

    return markedRotaNames.length > 0 ? (
      <div className="flex flex-col items-center">
        {markedRotaNames.map((rota, index) => (
          <div className={`${rota.cor} rounded-full w-10 h-4`}>
            <span key={index} className="text-xs">{rota.nome}</span>
          </div>
        ))}
      </div>
    ) : null
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Plano de Manutenção</h1>
      {isMounted && (
        <>
          <Calendar
            locale="pt-BR"
            view="month"
            tileContent={tileContent}
          />
          <button onClick={calcularTodasDatas} className="mt-4 p-2 bg-blue-500 text-white rounded">Calcular Datas</button>
          <button onClick={() => setIsModalOpen(true)} className="mt-4 ml-4 p-2 bg-green-500 text-white rounded">Adicionar Rota</button>
        </>
      )}
      {datasRotas.map(rota => (
        <div key={rota.nome} className="my-5">
          <h3>{rota.nome}</h3>
          <ul className="grid grid-cols-10 gap-3">
            {rota.datas.map((data, index) => (
              <li key={index} className="text-xs">Semana: {index + 1} - {data.toLocaleDateString()}</li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddRota={adicionarRota} />
    </div>
  )
}

export default Home