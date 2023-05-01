import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit{

  @Input()
  description = ''

  @Input()
  selected = false

  @Output()
  click = new EventEmitter<void>()
  
  constructor(){}

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit()
  }

}
