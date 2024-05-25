'use client'
import React, { useState } from 'react';
import './BusAnimation.css'; // Importa el archivo de estilos CSS

const BusAnimation = () => {
    const [isMovingForward, setIsMovingForward] = useState(true);
    const [isAtStationB, setIsAtStationB] = useState(false);

    const [passengersArrivingAtA, setPassengersArrivingAtA] = useState(0);
    const [passengersArrivingAtB, setPassengersArrivingAtB] = useState(0);
    const [passengersBoarding, setPassengersBoarding] = useState(0);
    const [passengersAlighting, setPassengersAlighting] = useState(0);
    const [peopleOnBus, setPeopleOnBus] = useState(0);
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');

    // Nuevos estados para el número de personas en cada estación
    const [peopleAtStationA, setPeopleAtStationA] = useState(0);
    const [peopleAtStationB, setPeopleAtStationB] = useState(0);

    const handleButtonClick = () => {
        // Simular personas que se bajan del bus
        const alighting = Math.floor(Math.random() * (peopleOnBus + 1)); // No pueden bajarse más personas de las que están en el bus
        setPassengersAlighting(alighting);

        // Actualizar el número de personas en el bus
        const newPeopleOnBus = peopleOnBus - alighting;
        setPeopleOnBus(newPeopleOnBus);

        // Si estamos en la estación A, restamos las personas que se bajan de la estación A
        if (!isAtStationB) {
            const newPeopleAtStationA = peopleAtStationA - alighting;
            setPeopleAtStationA(newPeopleAtStationA);
        } else {
            // Si estamos en la estación B, restamos las personas que se bajan de la estación B
            const newPeopleAtStationB = peopleAtStationB - alighting;
            setPeopleAtStationB(newPeopleAtStationB);
        }

        // Simular llegada de personas a la estación A
        const arrivingAtA = Math.floor(Math.random() * 5);
        setPassengersArrivingAtA(arrivingAtA);
        setPeopleAtStationA(peopleAtStationA + arrivingAtA);

        // Simular llegada de personas a la estación B
        const arrivingAtB = Math.floor(Math.random() * 5);
        setPassengersArrivingAtB(arrivingAtB);
        setPeopleAtStationB(peopleAtStationB + arrivingAtB);

        // Simular personas que se suben al bus
        const boarding = Math.floor(Math.random() * 5);
        setPassengersBoarding(boarding);

        // Actualizar el número de personas en el bus
        const newPeopleOnBusAfterBoarding = newPeopleOnBus + boarding;
        setPeopleOnBus(newPeopleOnBusAfterBoarding);

        // Actualizar la hora de salida y llegada
        const departure = new Date().toLocaleTimeString();
        setDepartureTime(departure);
        const arrival = new Date().toLocaleTimeString();
        setArrivalTime(arrival);

        // Cambiar la dirección del movimiento
        setIsMovingForward(!isMovingForward);
        setIsAtStationB(!isAtStationB);
    };
    const handleFinishButtonClick = () => {
        // Mostrar los datos finales
        alert(`Cantidad de personas que llegaron a la estación A: ${passengersArrivingAtA}\n
               Cantidad de personas que llegaron a la estación B: ${passengersArrivingAtB}\n
               Cantidad de personas que se subieron al bus: ${passengersBoarding}\n
               Cantidad de personas que se bajaron del bus: ${passengersAlighting}\n
               Cantidad de personas en el bus: ${peopleOnBus}\n
               Hora de salida: ${departureTime}\n
               Hora de llegada: ${arrivalTime}`);
    };

    return (
        <div className="relative w-full max-w-screen overflow-hidden h-64 bg-gray-200">
            {/* Información de personas en el bus y horas */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-gray-300 px-4 py-2 rounded">
                <p>Personas en el bus: {peopleOnBus}</p>
                <p>Personas en la estación A: {peopleAtStationA}</p>
                <p>Personas en la estación B: {peopleAtStationB}</p>
                <p>Personas que llegaron a la estación A: {passengersArrivingAtA}</p>
                <p>Personas que llegaron a la estación B: {passengersArrivingAtB}</p>
                <p>Personas que se subieron al bus: {passengersBoarding}</p>
                <p>Personas que se bajaron del bus: {passengersAlighting}</p>
                <p>Hora de salida: {departureTime}</p>
                <p>Hora de llegada: {arrivalTime}</p>
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
            <div className="absolute right-0 bottom-0 w-150 h-16 bg-red-500 flex items-center justify-center z-0">
                Estación B
            </div>

            {/* Bus */}
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/022/530/573/small/school-bus-isolated-cartoon-png.png"
                alt="Bus"
                className={`absolute bottom-0 w-30 h-12 transition-transform duration-10000 ${isMovingForward ? 'animate-bus-move-forward' : 'animate-bus-move-backward '
                    }  ${isAtStationB ? 'transform scale-y-[-1]' : ''} z-0`}
            />
        </div>

    );
};

export default BusAnimation;
