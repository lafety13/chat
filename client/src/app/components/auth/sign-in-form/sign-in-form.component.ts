import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IUserSignIn} from '../../../interfaces/user.interface';

@Component({
  selector: 'chat-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent implements OnInit {
  @Output()
  public submitted: EventEmitter<IUserSignIn> = new EventEmitter<IUserSignIn>();
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
  }

  private createForm() {
    this.form = this.fb.group({
      username: ''
    });
  }
}
