'use client'
import React from 'react'

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Bienvenido al Sistema de Gestión de Vuelos</h1>
        <p className="mt-2 text-lg">Administra y controla todos los aspectos de tus vuelos de manera eficiente</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <img src="https://knowledge.wingtra.com/hs-fs/hubfs/new_flightplan.jpg?width=688&name=new_flightplan.jpg"
          width="300" alt="Registrar Vuelos" className="max-w-full h-auto rounded-lg" />
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold mb-2">Registrar Vuelos</h2>
            <p className="text-gray-700">Añade nuevos vuelos a tu base de datos con información detallada sobre horarios, destinos, y más.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <img src="https://i.blogs.es/b497fa/03-3/650_1200.webp" alt="Ver Vuelos" className="max-w-full h-auto rounded-lg" width="250"/>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold mb-2">Ver Vuelos</h2>
            <p className="text-gray-700">Consulta la lista de vuelos programados, sus estados y detalles importantes en cualquier momento.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <img src="https://img.freepik.com/vector-gratis/composicion-color-tarjeta-embarque-realista-informacion-sobre-pasajero-parte-delantera-trasera_1284-17604.jpg" alt="Editar Vuelos" className="max-w-full h-auto rounded-lg" width="250"/>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold mb-2">Editar Vuelos</h2>
            <p className="text-gray-700">Modifica la información de vuelos existentes, como horarios, asientos disponibles, y más.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <img src="https://www.comologia.com/wp-content/uploads/2017/06/cancelar-vuelos-gratis-sin-pagar-extra.jpg" alt="Cancelar Vuelos" className="max-w-full h-auto rounded-lg" width="250" />
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold mb-2">Cancelar Vuelos</h2>
            <p className="text-gray-700">Cancela vuelos programados cuando sea necesario, gestionando reembolsos y notificaciones.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DashboardPage