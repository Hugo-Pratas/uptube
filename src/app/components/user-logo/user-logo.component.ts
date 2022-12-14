import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-logo',
  templateUrl: './user-logo.component.html',
  styleUrls: ['./user-logo.component.scss']
})
export class UserLogoComponent implements OnInit {
  @Input() src!: string;
  @Input() size!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
