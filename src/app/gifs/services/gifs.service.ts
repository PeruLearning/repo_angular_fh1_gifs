import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = 'EeEbNJ4tK1e8na5MSUVT6G1iGkmjQqE1';
  private apiBaseAddress = 'https://api.giphy.com';
  private gifsEndpoint = '/v1/gifs/search';
  private _tagsHistory: string[] = [];

  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  public get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('q', tag)
      .set('limit', 10);

    this.http.get<SearchResponse>(`${this.apiBaseAddress}${this.gifsEndpoint}`, { params })
      .subscribe(response => {
        this.gifList = response.data;
        console.log({ gifs: this.gifList });
      });
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    // Verificar si el tag ya está incluido en el arreglo
    if (this._tagsHistory.includes(tag)) {

      // Remover el tag del arreglo
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
    }

    // Insertar el nuevo elemento al inicio del arreglo
    this._tagsHistory.unshift(tag);

    // Cortar el arreglo a los 10 primero elementos
    this._tagsHistory = this._tagsHistory.slice(0, 10);

    // Guardar el historial en el localStorage
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadFromLocalStorage(): void {
    const jsonHistory = localStorage.getItem('history');
    if (jsonHistory) {
      this._tagsHistory = JSON.parse(jsonHistory!);

      if (this._tagsHistory.length > 0) {
        this.searchTag(this._tagsHistory[0]);
      }
    }
  }
}
