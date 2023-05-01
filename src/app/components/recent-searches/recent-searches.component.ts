import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit{

  recentSearches = [
    'Dance/Eletrônica', 'Feito para você', 'Hip Hop', 'Podcasts', 'Indie', 'Rock'
  ]

  searchField = ''

  constructor(){}

  ngOnInit(): void {
      
  }

  setSearch(search: string){
    this.searchField = search
  }

  search(){
    console.log(this.searchField)
  }

}
