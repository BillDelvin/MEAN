import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";

// component
import { Signin } from "./signin/signin.component";
import { Signup } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AngularMaterialModule,
    AuthRoutingModule,
  ],
  exports: [],
  declarations: [Signin, Signup],
  providers: [],
})
export class AuthModule {}
