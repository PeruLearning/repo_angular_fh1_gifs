import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent {

  @Input({
    required: true
  })
  public url!: string;

  @Input({
    required: true
  })
  public alt!: string;

  public isLoading: boolean = true;

  public onLoad(): void {
    console.log('Image loaded');
    this.isLoading = false;
  }
}
