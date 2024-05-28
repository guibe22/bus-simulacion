'use client'
import React, { useState } from 'react';
import './BusAnimation.css'; // Importa el archivo de estilos CSS
import { format } from 'date-fns';

const BusAnimation = () => {
    const [personasEnElBus, setPersonasEnElBus] = useState(0);
    const [personasEnLaEstacionA, setPersonasEnLaEstacionA] = useState(0);
    const [personasEnLaEstacionB, setPersonasEnLaEstacionB] = useState(0);
    const [personasQueLlegaronALaEstacionA, setPersonasQueLlegaronALaEstacionA] = useState(0);
    const [personasQueLlegaronALaEstacionB, setPersonasQueLlegaronALaEstacionB] = useState(0);
    const [personasQueSeSubieronAlBus, setPersonasQueSeSubieronAlBus] = useState(0);
    const [personasQueSeBajaronDelBus, setPersonasQueSeBajaronDelBus] = useState(0);
    const initialTime = new Date('2024-05-27T22:05:02'); 

    const [horaDeSalida, setHoraDeSalida] = useState(initialTime);
    const [horaDeLlegada, setHoraDeLlegada] = useState(initialTime);
    const [isMovingForward, setIsMovingForward] = useState(true);

    const [totalPersonasTransportadas, setTotalPersonasTransportadas] = useState(0);
    const [totalPersonasQueLlegaronALaEstacionA, setTotalPersonasQueLlegaronALaEstacionA] = useState(0);
    const [totalPersonasQueLlegaronALaEstacionB, setTotalPersonasQueLlegaronALaEstacionB] = useState(0);
    const [totalPersonasQueSeSubieronAlBus, setTotalPersonasQueSeSubieronAlBus] = useState(0);
    const [totalPersonasQueSeBajaronDelBus, setTotalPersonasQueSeBajaronDelBus] = useState(0);
    const [totalPersonasQueSeQuedaronSinMontarse, setTotalPersonasQueSeQuedaronSinMontarse] = useState(0);

    const options = { hour: '2-digit', minute: '2-digit', hour12: false };


    const handleFinishButtonClick = () => {
        alert(`Cantidad de personas que llegaron a la estación A: ${totalPersonasQueLlegaronALaEstacionA}\n
               Cantidad de personas que llegaron a la estación B: ${totalPersonasQueLlegaronALaEstacionB}\n
               Cantidad de personas que se subieron al bus: ${totalPersonasQueSeSubieronAlBus}\n
               Cantidad de personas que se quedaron sin montarse: ${totalPersonasQueSeQuedaronSinMontarse}\n
               Cantidad de personas en el bus: ${personasEnElBus}\n
               `);
    };
    const handleButtonClick = () => {
       
        const nuevasPersonasEnLaEstacionA = Math.floor(Math.random() * 10);
        const nuevasPersonasEnLaEstacionB = Math.floor(Math.random() * 10);
    
       
        setPersonasEnLaEstacionA(nuevasPersonasEnLaEstacionA);
        setPersonasEnLaEstacionB(nuevasPersonasEnLaEstacionB);
    
        
        const personasQueSeSubenAlBus = isMovingForward ? nuevasPersonasEnLaEstacionA : nuevasPersonasEnLaEstacionB;
        const personasQueSeBajaronDelBus = Math.floor(Math.random() * personasEnElBus);
    
        const nuevasPersonasEnElBus = personasEnElBus + personasQueSeSubenAlBus - personasQueSeBajaronDelBus;
        setPersonasEnElBus(nuevasPersonasEnElBus);
    
        
        if (isMovingForward) {
            setPersonasQueLlegaronALaEstacionA(nuevasPersonasEnLaEstacionA);
            setPersonasQueSeSubieronAlBus(personasQueSeSubenAlBus);
            setPersonasQueSeBajaronDelBus(personasQueSeBajaronDelBus);
            setTotalPersonasQueLlegaronALaEstacionA(totalPersonasQueLlegaronALaEstacionA + personasQueSeSubieronAlBus);
        } else {
            setPersonasQueLlegaronALaEstacionB(nuevasPersonasEnLaEstacionB);
            setPersonasQueSeSubieronAlBus(personasQueSeSubenAlBus);
            setPersonasQueSeBajaronDelBus(personasQueSeBajaronDelBus);
            setTotalPersonasQueLlegaronALaEstacionB(totalPersonasQueLlegaronALaEstacionB + personasQueSeSubieronAlBus);
        }
    
        
        setTotalPersonasTransportadas(totalPersonasTransportadas + personasQueSeSubenAlBus);
        setTotalPersonasQueSeSubieronAlBus(totalPersonasQueSeSubieronAlBus + personasQueSeSubenAlBus);
        setTotalPersonasQueSeBajaronDelBus(totalPersonasQueSeBajaronDelBus + personasQueSeBajaronDelBus);
        setTotalPersonasQueSeQuedaronSinMontarse(personasEnLaEstacionA + personasEnLaEstacionB);
    
      
        const nuevaHoraDeSalida = new Date(horaDeSalida);
        nuevaHoraDeSalida.setMinutes(nuevaHoraDeSalida.getMinutes() + 30);
        setHoraDeSalida(nuevaHoraDeSalida);
    
        const nuevaHoraDeLlegada = new Date(nuevaHoraDeSalida);
        nuevaHoraDeLlegada.setMinutes(nuevaHoraDeLlegada.getMinutes() + 30);
        setHoraDeLlegada(nuevaHoraDeLlegada);
    
        
        setIsMovingForward(!isMovingForward);
    };
    
    return (
        <div className="relative w-full max-w-screen overflow-hidden h-64 bg-gray-200">
            {/* Información de personas en el bus y horas */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-gray-300 px-4 py-2 rounded">
                <p>Personas en el bus: {personasEnElBus}</p>
                <p>Personas en la estación A: {personasEnLaEstacionA}</p>
                <p>Personas en la estación B: {personasEnLaEstacionA}</p>
                <p>Personas que llegaron a la estación A: {personasQueLlegaronALaEstacionA}</p>
                <p>Personas que llegaron a la estación B: {personasQueLlegaronALaEstacionB}</p>
                <p>Personas que se subieron al bus: {personasQueSeSubieronAlBus}</p>
                <p>Personas que se bajaron del bus: {personasQueSeBajaronDelBus}</p>
                <p>Hora de salida: {format(horaDeSalida, 'HH:mm:ss')}</p>
                <p>Hora de llegada: {format(horaDeLlegada, 'HH:mm:ss')}</p>
            </div>

            {/* Botón para mover */}
            <button
                onClick={handleButtonClick}
                className="absolute top-4 left-1/4 bg-blue-500 text-white px-4 py-2 rounded z-10"
            >
                {isMovingForward ? 'Mover de A a B' : 'Mover de B a A'}
            </button>

            {/* Botón para terminar */}
            <button
                onClick={handleFinishButtonClick}
                className="absolute top-4 right-1/4 bg-red-500 text-white px-4 py-2 rounded z-10"
            >
                Terminar
            </button>

            {/* Estación de inicio */}
            <div className="absolute left-0 bottom-0 w-50 h-16 bg-blue-500 flex items-center justify-center z-0">
                Estación A
            </div>

            {/* Estación de destino */}
            <div className="absolute right-0 bottom-0 w-50 h-16 bg-red-500 flex items-center justify-center z-0">
                Estación B
            </div>

            {/* Bus */}
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/022/530/573/small/school-bus-isolated-cartoon-png.png"
                alt="Bus"
                className={`absolute bottom-0 w-30 h-12 transition-transform duration-1000 ${isMovingForward ? 'animate-bus-move-forward' : 'animate-bus-move-backward'}`}
            />
        </div>
    );
};

export default BusAnimation;
