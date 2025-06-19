import PacketItem from "./PacketItem";

export default function PacketList({ packets }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packets.map((packet,index) => (
                <PacketItem key={index} packet={packet} />
            ))}
        </div>
    )
}