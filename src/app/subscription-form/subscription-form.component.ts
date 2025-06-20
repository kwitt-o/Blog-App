import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from '../models/subscription';
import { SubscribersService } from '../services/subscribers.service';


@Component({
  selector: 'app-subscription-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent {
  private subService = inject(SubscribersService);

  isEmailError: boolean = false;
  isSubscribed: boolean = false;

  onSubmit(formVal: Subscription) {
    const subData: Subscription = {
      name: formVal.name,
      email: formVal.email
    }

    this.subService.checkSub(subData.email).then((exists) => {
      if (exists) {
        this.isEmailError = true;
      } else {
        this.subService.addSubs(subData);
        this.isSubscribed = true;
      }
    })
  }

  onEmailInputChange(): void {
    this.isEmailError = false;
  }
}
