import {Component, Inject, Input, OnInit,} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";
import {Comment} from "../../model/comment";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {Subject} from 'rxjs';
import {faFlag} from "@fortawesome/free-regular-svg-icons";
import {faFlag as faFlagSolid} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() id!: number
  @Input() type!: string
  @Input('clickSubject') clickSubject!: Subject<any>;

  faFlag = faFlagSolid

  userForm: FormGroup; // variable is created of type FormGroup is created
  comments = [] as Comment[];
  postLogo = {} as Comment
  processedPage = false
  logoPaths = this._service.getCommentDefaultImages()
  page = 0
  finalPage = false
  errorName = false
  errorEmail = false
  errorMessage = false

  constructor(private _service: UpTubeServiceService, private fb: FormBuilder, public router: Router) {
    this.userForm = this.fb.group({
      inputName: '',
      inputEmail: '',
      inputMessage: ''
    });
  }

  async ngOnInit(): Promise<void> {
    this.randomizeLogo(this.postLogo)
    this.comments = await this._service.getComments(this.type, this.id, this.page)
    if (this.comments[0].date.length === 0) { //o drupal retorna um array com objecto com campos vazios se não tiver comentarios
      this.comments = []                     //meter o array novamente vazio para nao correr os for e dar um "comentario fantasma"
    }
    for (const comment of this.comments) {
      this.randomizeLogo(comment)
    }
    this.processedPage = true
    this.clickSubject.subscribe(async e => {
      this.getNewComments()
    });

  }

  randomizeLogo(comment: Comment): void { //no need for return because of reference type
    const random = Math.floor(Math.random() * this.logoPaths.length); //um numero random até ao valor maximo do lenght do logo
    comment.logo = <string>this.logoPaths.splice(random, 1)[0] //Remove essa casa do array
    if (this.logoPaths.length < 1) { //adiciona novamente todos os logos caso a lista chegue ao fim
      this.logoPaths = this._service.getCommentDefaultImages()
    }
  }

  postComment() {
    let postComment = {} as Comment //get values
    postComment.username = this.userForm.get('inputName')?.value;
    postComment.email = this.userForm.get('inputEmail')?.value;
    postComment.body = this.userForm.get('inputMessage')?.value;

    if (this.verifyValues(postComment.username, postComment.email, postComment.body))
      return

    this._service.postComment(this.type, this.id, postComment.username, postComment.email, postComment.body) //post
    this.randomizeLogo(postComment)
    postComment.date = "Agora"
    this.comments.unshift(postComment)
    this.userForm.get('inputName')?.setValue("")
    this.userForm.get('inputEmail')?.setValue("")
    this.userForm.get('inputMessage')?.setValue("")
  }

  verifyValues(username: string, email: string, body: string) {
    let badInput = false
    if (username.length < 1) {
      this.errorName = true
      setTimeout(() => {
        this.errorName = false;
      }, 1000);
      badInput = true
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.length < 1 || !email.match(validRegex)) {
      this.errorEmail = true
      setTimeout(() => {
        this.errorEmail = false;
      }, 1000);
      badInput = true
    }
    if (body.length < 1) {
      this.errorMessage = true
      setTimeout(() => {
        this.errorMessage = false;
      }, 1000);
      badInput = true
    }
    return badInput
  }

  async getNewComments() {
    if (!this.finalPage) {
      this.page++
      let newComments = await this._service.getComments(this.type, this.id, this.page)
      if (newComments.length < 10 || newComments[0].date.length === 0) { //a api às vezes retorna objectos vazios qd n tem mais comentarios
        this.finalPage = true
        return;
      }
      for (const newComment of newComments) {
        this.randomizeLogo(newComment)
      }
      this.comments.push.apply(this.comments, newComments)
    }
  }

  reportComment () {
    alert("Confirmamos o report. A nossa equipa vai analisar o conteúdo deste comentário. Obrigado pela contribuição!")
  }
}
