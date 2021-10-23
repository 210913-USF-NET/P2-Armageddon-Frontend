import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styles: [
  ]
})
export class TitleCardComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  // testFunc(): any {
  //   let grid = document.getElementById('test')
  //   console.debug(grid)
  //   for (let i = 1; i <= 10; i++) {
  //     let th = document.createElement('th')
  //     for (let j = 1; j <= 10; j++) {
  //       let tr = document.createElement('tr')
  //       tr.innerText = "test"
  //       tr.id = 'frank'
  //       th.appendChild(tr)
  //     }
  //     grid?.appendChild(th)
  //   }
  // }

  createBoard(){
    var grid = document.getElementById('itemsList')!
  console.log(grid)
  // let div = document.createElement('div')
  // let div = document.createElement('div');
  for (let i = 0; i < 100; i++) {
    grid.innerHTML += `<div class="cell" id="cell${i}" draggable="false" ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
    // let div = document.createElement('div');
    // div.innerText = "test"

    // div.id = 'cell' + i;
    // div.className = 'cell';
    // grid?.appendChild(div);
    // grid.id = 'cell' + i
    //   console.log(div)
    //   grid.appendChild(div)
  }
}
// allowDrop(ev) {
//   ev.preventDefault();
//   console.log("Allow Drop");
// }

// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
//   console.log("Drag");

// }

// function drop(ev) {
//   ev.preventDefault();
//   console.log(ev);
//   var data = ev.dataTransfer.getData("text");
//   console.log(data);
//   ev.target.appendChild(document.getElementById(data));
//   console.log("Drop");

// }
}