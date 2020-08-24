import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Signin } from "./signin/signin.component";
import { Signup } from "./signup/signup.component";

const routes: Routes = [
  { path: "signin", component: Signin },
  { path: "signup", component: Signup },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AuthRoutingModule {}
