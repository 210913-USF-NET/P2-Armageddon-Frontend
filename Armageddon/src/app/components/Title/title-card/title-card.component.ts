import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.css']
})
export class TitleCardComponent implements OnInit {

  constructor() { 
    
  }
  
  ngOnInit(): void {
  }
  
  testFunc(): any {
    let grid = document.getElementById('test')
    console.debug(grid)
    for(let i = 1; i <= 10; i++)
    {
      let tr = document.createElement('tr')
      for(let j = 1; j <= 10; j++)
      {
        let td = document.createElement('td')
        td.innerText = "test"
        tr.appendChild(td)
      }
      grid?.appendChild(tr)
    }
  }
}
