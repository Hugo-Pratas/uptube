import {Component, Input, OnInit} from '@angular/core';
import {UpTubeServiceService} from "../../services/up-tube-service.service";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  constructor(private _service: UpTubeServiceService) {
  }

  @Input() tags!: number[];
  processedPage = false;
  tagsName = [] as string[];

  async ngOnInit(): Promise<void> {
    this.tagsName = await this._service.getTagsNamebyID(this.tags)
    this.processedPage = true
  }

}
