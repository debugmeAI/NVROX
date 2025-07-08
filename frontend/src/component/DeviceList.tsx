import React, { useEffect, useState } from "react";
import type { Device } from "../types/device";
import { getDevices } from "../services/deviceService";

const DeviceList: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getDevices()
            .then((data: Device[]) => {
                setDevices(data);
                setLoading(false);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to load devices");
                }
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Device List</h1>
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Last Seen</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                        <tr key={device.id}>
                            <td className="border p-2">{device.id}</td>
                            <td className="border p-2">{device.device_name}</td>
                            <td className="border p-2">{device.status}</td>
                            <td className="border p-2">
                                {new Date(device.created_at).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeviceList;
