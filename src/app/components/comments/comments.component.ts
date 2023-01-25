import {Component, Input, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Comment} from "../../model/comment";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() id!: number
  @Input() type!: string
  userForm: FormGroup; // variable is created of type FormGroup is created
  comments = [] as Comment[];
  postLogo = {} as Comment
  processedPage = false
  logoPaths = this._service.getCommentDefaultImages()

  constructor(private _service: UpTubeServiceService, private fb: FormBuilder, public router: Router) {
    this.userForm = this.fb.group({
      inputName: '',
      inputEmail: '',
      inputMessage: ''
    });
  }

  async ngOnInit(): Promise<void> {
    this.randomizeLogo(this.postLogo)
    this.comments = await this._service.getComments(this.type, this.id)
    for (const comment of this.comments) {
      this.randomizeLogo(comment)
    }
    this.processedPage = true
  }

  randomizeLogo(comment: Comment): void { //no need for return because of reference type
    const random = Math.floor(Math.random() * this.logoPaths.length); //um numero random até ao valor maximo do lenght do logo
    comment.logo = <string>this.logoPaths.splice(random, 1)[0] //Remove essa casa do array
    if (this.logoPaths.length < 1) { //adiciona novamente todos os logos caso a lista chegue ao fim
      this.logoPaths = this._service.getCommentDefaultImages()
    }
  }

  postComment() {
    let postComment = {} as Comment
    postComment.username = this.userForm.get('inputName')?.value;
    postComment.email = this.userForm.get('inputEmail')?.value;
    postComment.body = this.userForm.get('inputMessage')?.value;
    this._service.postComment(this.type, this.id, postComment.username, postComment.email, postComment.body)
    this.randomizeLogo(postComment)
    this.comments.unshift(postComment)
    this.userForm.get('inputName')?.setValue("")
    this.userForm.get('inputEmail')?.setValue("")
    this.userForm.get('inputMessage')?.setValue("")
  }
}
