import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { Router } from "@angular/router";
import { Form } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdate = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    // return [...this.posts];
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3300/api/getPosts"
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
            };
          });
        })
      )
      .subscribe((transformPost) => {
        this.posts = transformPost;
        this.postsUpdate.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>(`http://localhost:3300/api/getPost/${id}`);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:3300/api/addPosts",
        postData
      )
      .subscribe((responseData) => {
        const post: Post = {
          id: responseData.post.id,
          title: title,
          content: content,
          imagePath: responseData.post.imagePath,
        };
        this.posts.push(post);
        this.postsUpdate.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image);
    } else {
      postData = { id, title, content, imagePath: image };
    }

    this.http
      .put(`http://localhost:3300/api/updatePost/${id}`, postData)
      .subscribe((res) => {
        const updatePost = [...this.posts];
        const oldPostIndex = updatePost.findIndex((p) => p.id === id);
        const post: Post = { id, title, content, imagePath: image };
        updatePost[oldPostIndex] = post;
        this.posts = updatePost;
        this.postsUpdate.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete(`http://localhost:3300/api/deletePost/${postId}`)
      .subscribe(() => {
        const updatePosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatePosts;
        this.postsUpdate.next([...this.posts]);
      });
  }
}
