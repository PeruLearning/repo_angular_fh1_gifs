import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  public get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
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
  }
}
