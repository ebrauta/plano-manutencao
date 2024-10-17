'use client';
import React, { useState } from "react";
import { Rota } from "./page";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddRota: (novaRota: Rota) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onAddRota, onClose }) => {
    const [nome, setNome] = useState<string>('')
    const [frequencia, setFrequencia] = useState<number>(1)
    const [dataInicio, setDataInicio] = useState<Date | null>(null)
    const [cor, setCor] = useState<string>('bg-blue-500')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (dataInicio) {
            onAddRota({ id: Date.now(), nome, frequencia, dataInicio, cor })
            onClose()
        }
    }

    return (
        isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-5 rounded shadow-md">
                    <h2 className="mb-4">Adicionar Rota</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome da Rota:</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="border rounded w-full p-2"
                                required
                            />
                        </div>
                        <div>
                            <label>Frequência (em dias):</label>
                            <input
                                type="number"
                                value={frequencia}
                                onChange={(e) => setFrequencia(Number(e.target.value))}
                                className="border rounded w-full p-2"
                                required
                            />
                        </div>
                        <div>
                            <label>Data de Início:</label>
                            <input
                                type="date"
                                onChange={(e) => setDataInicio(new Date(e.target.value))}
                                className="border rounded w-full p-2"
                                required
                            />
                        </div>
                        <div>
                            <label>Cor:</label>
                            <input
                                type="text"
                                value={cor}
                                onChange={(e) => setCor(e.target.value)}
                                className="border rounded w-full p-2"
                                placeholder="bg-color (ex: bg-blue-500)"
                                required
                            />
                        </div>
                        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Adicionar Rota</button>
                        <button type="button" onClick={onClose} className="mt-4 p-2 bg-gray-500 text-white rounded">Cancelar</button>
                    </form>
                </div>
            </div>
        ) : null
    )
}

export default Modal