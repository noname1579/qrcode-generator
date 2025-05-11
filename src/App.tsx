import { useState } from 'react'
import './styles/App.css'
import axios from 'axios'
import { BrushCleaning } from 'lucide-react'

function App() {

  const [data, setData] = useState('')

  const [qrcode, setQrcode] = useState('')

  async function sendData() {
    try {
      const response = await axios.get(`https://qr-server-sigma.vercel.app/api/qrcode?data=${data}`, {
        responseType: 'blob'
      })
      const blobUrl = URL.createObjectURL(response.data);
      setQrcode(blobUrl)
    } catch (error) {
      console.error('Ошибка при получении QR-кода:', error)
      alert('Ошибка при генерации QR-кода')
      setQrcode('')
    }
  }

  function clearData() {
    console.log(132)
    setQrcode('')
  }


  return (
    <main className="bg-gray-900 text-white rounded-xl w-full p-5 md:p-10 shadow-lg flex flex-col items-center">
      <h1 className="text-xl md:text-3xl font-bold mb-20 select-none">Генератор QR-кодов</h1>
      <input
        type="text"
        placeholder="Введите URL"
        className="w-full rounded-xl px-4 py-3 text-gray-900 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={data}
        onChange={e => {
          setData(e.target.value)
        }}
      />
      <button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors rounded-xl py-3 font-bold text-[15px] md:text-lg select-none" onClick={sendData}>
        Сгенерировать
      </button>
      { qrcode && <img src={qrcode} alt="QR код" className='rounded-xl mt-12' /> }
      { qrcode && <BrushCleaning size={35} className='mt-5 cursor-pointer' onClick={clearData} /> }
  </main>
  )
}

export default App
