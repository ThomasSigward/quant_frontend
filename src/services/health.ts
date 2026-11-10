import api from "./api";

export interface HealthResponse {
  status: string;
  message: string;
}

export async function checkBackend(): Promise<HealthResponse> {
  const response = await api.get<HealthResponse>("/api/health/");
  return response.data;
}