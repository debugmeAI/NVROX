import api from "./api";
import type { Device } from "../types/device";

export const getDevices = async (): Promise<Device[]> => {
    const response = await api.get<Device[]>("/devices");
    return response.data;
};
