import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
  ]
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  createBoard() {
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
