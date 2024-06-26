import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private _gifsService: GifsService) { }

  public get tags(): string[] {
    return this._gifsService.tagsHistory;
  }

  public searchTags(tag: string): void {
    this._gifsService.searchTag(tag);
  }

  public deleteTag(tag: string): void {
    this._gifsService.deleteTag(tag);
  }
}
