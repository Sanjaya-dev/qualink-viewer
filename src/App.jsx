import { useState } from 'react'
import UploadArea from './components/UploadArea'
import PacketList from './components/PacketList'
import './App.css'

function App() {
  const [packets, setPackets] = useState([]);
  const resetPackets = () => setPackets([]);

  return (
    <div className="min-h-scree p-4">
      <div className="max-w-4xl mx-auto shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Quanlink Viewer
        </h1>
        <UploadArea onLoad={setPackets} onReset={resetPackets} />
        <PacketList packets={packets} />
      </div>
    </div>
  );
}

export default App
