import { Component, Input } from '@angular/core';

@Component({
  selector: 'ovm-anchor',
  standalone: true,
  imports: [],
  templateUrl: './anchor.component.html',
  styleUrl: './anchor.component.scss'
})
export class AnchorComponent {
  @Input() name = 'Link';
  @Input() href = 'Link';

}
