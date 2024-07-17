export default function Home() {
  return (<>
   <div className="relative hero h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://media.primicias.ec/2024/03/18113129/AeropuertoQuito180324.png)', backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundBlendMode: 'overlay' }}>
    <div className="bg-black bg-opacity-50 p-8 rounded-lg">
    <h2 className="text-5xl font-bold mb-4 text-white">Aeropuerto me la doblas</h2>
    <p className="text-lg mb-8 text-white">Tu puerta de entrada al mundo. Descubre nuestros destinos y servicios.</p>
    <a href="/auth/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Explorar</a>

    </div>
  </div>
    
  </>)
}
