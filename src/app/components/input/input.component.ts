import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.styl'],
})
export class InputComponent implements OnInit {
  @Input()
  public title: string = '';
  @Input()
  public placeholder: string = '';
  @Input()
  public value: string;
  @Input()
  public type: 'text' | 'password' = 'text';

  @Output()
  public valueChange = new EventEmitter<string>();

  constructor() {}

  public ngOnInit(): void {}

  // Events
  public onChangeValue(): void {
    this.valueChange.emit(this.value);
  }
}
