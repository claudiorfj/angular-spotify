import { Component, Input, OnInit } from '@angular/core';
import { faCirclePlay, faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{

  @Input()
  ImageUrl = ''

  @Input()
  Text = ''

  playIcon = faCirclePlay

  constructor(){ }

  ngOnInit(): void {
      
  }
}
