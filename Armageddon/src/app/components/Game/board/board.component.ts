import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [
  ]
})
export class BoardComponent implements OnInit {

  userGrid: any
  computerGrid: any
  displayGrid: any
  ships: any
  destroyer: any
  submarine: any
  cruiser: any
  battleship: any
  carrier: any
  userSquares: any
  computerSquares: any
  width: any
  isHorizontal: any
  isGameOver: any
  currentPlayer: any
  shipArray: any
  direction: any
  selectedShipNameWithIndex: any
  draggedShip: any
  draggedShipLength: any
  childNodes: any
  selectedShipIndex: any;

  constructor() { }

  ngOnInit(): void {
    this.userGrid = document.querySelector('.grid-user')
    this.computerGrid = document.querySelector('.grid-computer')
    this.displayGrid = document.querySelector('.grid-display')

    this.ships = document.querySelectorAll('.ship')
    this.destroyer = document.querySelector('.destroyer-container')
    this.submarine = document.querySelector('.submarine-container')
    this.cruiser = document.querySelector('.cruiser-container')
    this.battleship = document.querySelector('.battleship-container')
    this.carrier = document.querySelector('.carrier-container')

    this.userSquares = []
    this.computerSquares = []
    this.width = 10

    this.isHorizontal = true
    this.isGameOver = true
    this.currentPlayer = 'user'

    this.shipArray = [
      {
        name: 'destroyer',
        directions: [
          [0, 1],
          [0, this.width]
        ]
      },
      {
        name: 'submarine',
        directions: [
          [0, 1, 2],
          [0, this.width, this.width * 2]
        ]
      },
      {
        name: 'cruiser',
        directions: [
          [0, 1, 2],
          [0, this.width, this.width * 2]
        ]
      },
      {
        name: 'battleship',
        directions: [
          [0, 1, 2, 3],
          [0, this.width, this.width * 2, this.width * 3]
        ]
      },
      {
        name: 'carrier',
        directions: [
          [0, 1, 2, 3, 4],
          [0, this.width, this.width * 2, this.width * 3, this.width * 4]
        ]
      },
    ]

    this.createBoard(this.userGrid, this.userSquares)
    this.createBoard(this.computerGrid, this.computerSquares)

    this.generate(this.shipArray[0])
    this.generate(this.shipArray[1])
    this.generate(this.shipArray[2])
    this.generate(this.shipArray[3])
    this.generate(this.shipArray[4])

    this.ships.forEach((ship: any) => ship.addEventListener('dragstart', this.dragStart))
    this.userSquares.forEach((square: any) => square.addEventListener('dragstart', this.dragStart))
    this.userSquares.forEach((square: any) => square.addEventListener('dragover', this.dragOver))
    this.userSquares.forEach((square: any) => square.addEventListener('dragenter', this.dragEnter))
    this.userSquares.forEach((square: any) => square.addEventListener('dragleave', this.dragLeave))
    this.userSquares.forEach((square: any) => square.addEventListener('drop', this.dragDrop))
    this.userSquares.forEach((square: any) => square.addEventListener('dragend', this.dragEnd))

    this.ships.forEach((ship: any) => ship.addEventListener('mousedown', ((e: any) => {
      this.selectedShipNameWithIndex = e.target.id
      // console.log(this.selectedShipNameWithIndex)
    })))
  }

  createBoard(grid: any, squares: any) {
    for (let i = 0; i < this.width * this.width; i++) {
      const square = document.createElement('div')
      square.dataset.id = i.toString()
      grid.appendChild(square)
      squares.push(square)
    }
  }

  generate(ship: any) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) this.direction = 1
    if (randomDirection === 1) this.direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * this.computerSquares.length - (ship.directions[0].length * this.direction)))

    const isTaken = current.some((index: any) => this.computerSquares[randomStart + index].classList.contains('taken'))
    const isAtRightEdge = current.some((index: any) => (randomStart + index) % this.width === this.width - 1)
    const isAtLeftEdge = current.some((index: any) => (randomStart + index) % this.width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach((index: any) => this.computerSquares[randomStart + index].classList.add('taken', ship.name))
    else this.generate(ship)
  }

  dragStart() {
    this.draggedShip = this
    this.draggedShipLength = this.childNodes.length
    console.log("drag start")
    console.log(this.draggedShip)
  }

  dragOver(e: any) {
    e.preventDefault()
  }

  dragEnter(e: any) {
    e.preventDefault()
  }

  dragLeave() {
    console.log('drag leave')
  }

  dragDrop() {
    console.log(this.draggedShip)
    let shipNameWithLastId = this.draggedShip.lastChild.id
    let shipClass = shipNameWithLastId.slice(0, -2)
    console.log(shipClass)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
    let shipLastId = lastShipIndex
    //+ parseInt(this.dataset.id)
    console.log(shipLastId)
    const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93]
    const notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60]

    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

    this.selectedShipIndex = parseInt(this.selectedShipNameWithIndex.substr(-1))

    shipLastId = shipLastId - this.selectedShipIndex
    console.log(shipLastId)

    if (this.isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        this.userSquares[/*parseInt(this.dataset.id) - */ this.selectedShipIndex + i].classList.add('taken', shipClass)
      }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!this.isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        this.userSquares[/*parseInt(this.dataset.id) - */ this.selectedShipIndex + this.width * i].classList.add('taken', shipClass)
      }
    } else return

    this.displayGrid.removeChild(this.draggedShip)
    console.log('drag drop')
  }

  dragEnd() {
    console.log('dragend')
  }
}