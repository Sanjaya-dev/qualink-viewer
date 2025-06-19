import { useState } from "react";
import MapView from "./MapView";

export default function PacketItem({ packet }) {
    const [showOriginal, setShowOriginal] = useState(false);
    const [showCompressed, setShowCompressed] = useState(false);


    const original = packet.original_message || "";
    const compressed = packet.compressed_message || "";
    const compressionRatio = packet.compression_ratio ? (parseFloat(packet.compression_ratio) * 100).toFixed(2) : 'N/A'; 

    return (
      <div className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm text-black">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-left">
          <div className="font-bold text-black">Packet ID:</div>
          <div>{packet.packet_id}</div>

          <div className="font-bold text-black">Timestamp:</div>
          <div>{packet.timestamp}</div>

          <div className="font-bold text-black">Service Code:</div>
          <div>{packet.service_code}</div>

          <div className="font-bold text-black">GPS:</div>
          <div>
            {packet.gps_lat}, {packet.gps_lng}
          </div>

          <div className="font-bold text-black">Compression Ratio:</div>
          <div>{compressionRatio}%</div>

          <div className="font-bold text-black">Flight ID:</div>
          <div>{packet.flight_id || "N/A"}</div>
        </div>

        <div className="my-4">
          <MapView lat={packet.gps_lat} lng={packet.gps_lng} />
        </div>

        {/* Toggle Original Message */}
        <div className="mt-4">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showOriginal ? "Hide Original Message" : "Show Original Message"}
          </button>

          {showOriginal && (
            <div className="mt-2 bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Original Message</h4>
              <pre className="whitespace-pre-wrap break-words">{original}</pre>
            </div>
          )}
        </div>

        {/* Toggle Compressed Message */}
        <div className="mt-4">
          <button
            onClick={() => setShowCompressed(!showCompressed)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {showCompressed
              ? "Hide Compressed Message"
              : "Show Compressed Message"}
          </button>

          {showCompressed && (
            <div className="mt-2 bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Compressed Message</h4>
              <pre className="whitespace-pre-wrap break-words">
                {compressed}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
}