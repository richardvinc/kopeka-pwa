import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user/user.service';

import { DogWalkingIllustrationComponent } from './components/dog-walking-illustration.component';
import { WalkingTogetherIllustrationComponent } from './components/walking-together-illustration.component';
import { UniqueUsernameValidator } from './validators/unique-username-validator.directive';
import { UsernameRegexValidator } from './validators/username-regex-validator.directive';

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  templateUrl: './create-user-page.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WalkingTogetherIllustrationComponent,
    DogWalkingIllustrationComponent,
  ],
})
export class CreateUserPageComponent implements OnInit {
  isLoading = true;
  recommendedUsernames: { value: string; selected: boolean }[] = [];

  isFormValid = false;
  createUserForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      asyncValidators: [
        this.uniqueUsernameValidator.validate.bind(
          this.uniqueUsernameValidator
        ),
      ],
      updateOn: 'blur',
      validators: [Validators.required, UsernameRegexValidator()],
    }),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private uniqueUsernameValidator: UniqueUsernameValidator
  ) {
    this.userService.getSelf().subscribe((user) => {
      if (user) {
        this.router.navigate(['/explore']);
      } else {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.userService
      .getUsernameRecommendations()
      .subscribe((recommendedUsernames) => {
        this.recommendedUsernames = recommendedUsernames.data.map(
          (username) => ({ value: username, selected: false })
        );
      });
  }

  selectUsername(username: string) {
    this.recommendedUsernames.map((recommendedUsername) => {
      recommendedUsername.selected = recommendedUsername.value === username;
    });
    this.createUserForm.controls['username'].setValue(username);
  }

  submitForm() {
    console.log(this.createUserForm.value);
  }
}
