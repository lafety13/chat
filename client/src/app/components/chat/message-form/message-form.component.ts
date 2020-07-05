import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'chat-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageFormComponent implements OnInit {
  @Input()
  public set value(value: string) {
    if (this.form && value) {
      this.form.get('message').setValue(value);
    }
  }

  @Output()
  public submitted: EventEmitter<any> = new EventEmitter<any>();
  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit() {
    this.createForm();
  }

  public onSubmit() {
    this.submitted.emit(
      this.form.value
    );

    this.form.reset();
  }

  private createForm() {
    this.form = this.fb.group({
      message: ''
    });
  }
}
