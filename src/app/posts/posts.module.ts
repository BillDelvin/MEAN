import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports: [],
  declarations: [PostCreateComponent, PostListComponent],
  providers: [],
})
export class PostsModule {}
