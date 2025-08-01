// API service for communicating with the backend
import { CONFIG } from './config';

export interface PredictionResponse {
  success: boolean;
  class: string;
  confidence: number;
  message: string;
  error?: string;
}

export const predictSkinCondition = async (imageBase64: string): Promise<PredictionResponse> => {
  let lastError: string | null = null;
  
  for (const baseUrl of CONFIG.BACKEND_URLS) {
    try {
      console.log(`Trying backend URL: ${baseUrl}${CONFIG.ENDPOINTS.PREDICT}`);
      
      const response = await fetch(`${baseUrl}${CONFIG.ENDPOINTS.PREDICT}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          image: imageBase64
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        console.log('Successfully received prediction:', data);
        return data;
      } else {
        lastError = data.error || `Server error: ${response.status}`;
        console.warn(`Backend responded with error:`, lastError);
      }
    } catch (e: any) {
      lastError = e.message || 'Network connection failed';
      console.warn(`Failed to connect to ${baseUrl}:`, lastError);
    }
  }
  
  // If we get here, all URLs failed
  throw new Error(`Could not connect to backend server. Last error: ${lastError}`);
};

export const checkBackendHealth = async (): Promise<boolean> => {
  for (const baseUrl of CONFIG.BACKEND_URLS) {
    try {
      const response = await fetch(`${baseUrl}${CONFIG.ENDPOINTS.PING}`);
      if (response.ok) {
        console.log(`Backend is healthy at: ${baseUrl}`);
        return true;
      }
    } catch (e) {
      console.warn(`Backend health check failed for ${baseUrl}:`, e);
    }
  }
  return false;
}; 