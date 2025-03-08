import 'dotenv/config';
import { IRacingResponse } from '../types';

export class IRacingClient {
  secret: string;

  baseUrl?: string;

  constructor(secret: string) {
    this.secret = secret;
    this.baseUrl = process.env.IRACING_BASE_URL;
  }

  private checkBaseUrl() {
    if (!this.baseUrl) {
      throw new Error('Auth Error: Iracing Base URL not defined.');
    }
  }

  async getTrackAssets() {
    this.checkBaseUrl();

    const response = await fetch(`${this.baseUrl}/data/track/assets`, {
      headers: {
        cookie: this.secret,
      },
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error(
        'IR-API Error: Unexpected error fetching track assets link',
      );
    }

    const data: IRacingResponse = await response.json();
    const trackAssetsResponse = await fetch(data.link);

    if (!trackAssetsResponse.ok) {
      console.error(await trackAssetsResponse.text());
      throw new Error('IR-API Error: Unexpected error fetching track assets');
    }

    return trackAssetsResponse.text();
  }

  async getTrackList() {
    this.checkBaseUrl();

    const response = await fetch(`${this.baseUrl}/data/track/get`, {
      headers: {
        cookie: this.secret,
      },
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error(
        'IR-API Error: Unexpected error fetching track list link',
      );
    }

    const data = await response.json();
    const trackListResponse = await fetch(data.link);

    if (!trackListResponse.ok) {
      console.error(await trackListResponse.text());
      throw new Error('IR-API Error: Unexpected error fetching track list');
    }

    return trackListResponse.text();
  }

  async getTrackSvg(mapBaseUrl: string, mapLayerPath: string) {
    const response = await fetch(`${mapBaseUrl}${mapLayerPath}`, {
      headers: {
        cookie: this.secret,
      },
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error('IR-API Error: Unexpected error fetching track svg');
    }

    return response.text();
  }
}
