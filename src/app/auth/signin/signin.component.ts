import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class Signin implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSignin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signinUser(form.value.email, form.value.password);
  }
}
