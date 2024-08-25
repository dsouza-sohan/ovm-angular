import { Component, Input, InputSignal, output, Output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'ovm-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonName = 'Button';
  @Input() buttonType:'button' | 'submit' = 'button';

  onClick: OutputEmitterRef<void> = output();

  click(): void {
    this.onClick.emit();
  }
}
