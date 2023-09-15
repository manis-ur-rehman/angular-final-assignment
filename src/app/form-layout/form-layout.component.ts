import { Component, Input } from '@angular/core';
import { ErrorType } from 'types';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.css']
})
export class FormLayoutComponent {
  @Input() title!:string;
  @Input() description!:string;
  @Input() error!: ErrorType;
  @Input() loading!: boolean
}
