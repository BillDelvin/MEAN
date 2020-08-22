import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class Signup implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }
}
