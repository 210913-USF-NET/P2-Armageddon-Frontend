import { Component, OnInit, Directive, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { layout } from 'src/app/models/layOut';
import { match } from 'src/app/models/match';
import { turn } from 'src/app/models/turn';
import { user } from 'src/app/models/user';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'
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
  startButton: any
  turnDisplay: any
  infoDisplay: any
  playerShipCount: any
  destroyerCount: any
  submarineCount: any
  cruiserCount: any
  battleshipCount: any
  carrierCount: any
  cpuDestroyerCount: any
  cpuSubmarineCount: any
  cpuCruiserCount: any
  cpuBattleshipCount: any
  cpuCarrierCount: any
  rotateButton: any
  square: any
  component: any
  gameStarted: any

  content: any

  match: match = {
    id: 0,
    hostId: 0,
    turnCount: 0,
    winnerId: 0,
    opponentId: 0
  }

  layouts: layout[] = [
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    },
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    },
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    },
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    },
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    },
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    },
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    },
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    },
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    },
    {
      'id': 0,
      'playerId': 0,
      'matchId': 0,
      'shipType': '',
      'startLocation': 0,
      'direction': ''
    }
  ]
  turns: turn[] = [];
  counter: number = 0;
  name: string = ''
  user: user = {
    'id': 0,
    'username': '',
    'email': '',
    'winStreak': 0,
    'shotStreak': 0,
    'totalWins': 0,
    'totalMatches': 0
  }


  gridLocation: any

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef, private armAPI: ArmageddonApiService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        this.name = JSON.parse(JSON.stringify(profile, null, 2)).nickname;

        this.armAPI.getUserByName(this.name).then((value) => {
          this.user.id = value.id;
          this.user.username = value.username;
          this.user.email = value.email;
          this.user.winStreak = value.winStreak;
          this.user.shotStreak = value.shotStreak;
          this.user.totalWins = value.totalWins;
          this.user.totalMatches = value.totalMatches;

          console.log(this.user);
        });
      });

    this.userGrid = document.querySelector('.grid-user')
    this.computerGrid = document.querySelector('.grid-computer')
    this.displayGrid = document.querySelector('.grid-display')
    this.ships = document.querySelectorAll('.ship')
    this.destroyer = document.querySelector('.destroyer-container')
    this.submarine = document.querySelector('.submarine-container')
    this.cruiser = document.querySelector('.cruiser-container')
    this.battleship = document.querySelector('.battleship-container')
    this.carrier = document.querySelector('.carrier-container')
    this.startButton = document.querySelector('#start')
    this.rotateButton = document.querySelector('#rotate')
    this.turnDisplay = document.querySelector('#whose-go')
    this.infoDisplay = document.querySelector('#info')
    this.userSquares = []
    this.computerSquares = []
    this.isHorizontal = true
    this.isGameOver = false
    this.currentPlayer = 'user'
    this.width = 10

    this.playerShipCount = 0
    this.destroyerCount = 0
    this.submarineCount = 0
    this.cruiserCount = 0
    this.battleshipCount = 0
    this.carrierCount = 0

    this.cpuDestroyerCount = 0
    this.cpuSubmarineCount = 0
    this.cpuCruiserCount = 0
    this.cpuBattleshipCount = 0
    this.cpuCarrierCount = 0

    this.gameStarted = false

    this.content = document.getElementById('content')

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

    this.createBoard(this.userGrid)
    this.createBoardCpu(this.computerGrid)

    this.generate(this.shipArray[0])
    this.generate(this.shipArray[1])
    this.generate(this.shipArray[2])
    this.generate(this.shipArray[3])
    this.generate(this.shipArray[4])

    this.ships.forEach((ship: any) => this.renderer.listen(ship, "dragstart", (event: any) => this.dragStart(event)).bind(this))
    this.userSquares.forEach((square: any) => square.addEventListener('dragstart', this.dragStart.bind(this)))
    this.userSquares.forEach((square: any) => square.addEventListener('dragover', this.dragOver.bind(this)))
    this.userSquares.forEach((square: any) => square.addEventListener('dragenter', this.dragEnter.bind(this)))
    this.userSquares.forEach((square: any) => square.addEventListener('dragleave', this.dragLeave.bind(this)))
    this.userSquares.forEach((square: any) => square.addEventListener('drop', this.dragDrop.bind(this)))
    this.userSquares.forEach((square: any) => square.addEventListener('dragend', this.dragEnd.bind(this)))

    this.ships.forEach((ship: any) => ship.addEventListener('mousedown', ((e: any) => {
      this.selectedShipNameWithIndex = e.target.id
      // console.log(this.selectedShipNameWithIndex)
    }).bind(this)))
  }

  createBoard(grid: any) {
    for (let i = 0; i < this.width * this.width; i++) {
      this.square = document.createElement('div')
      this.square.dataset.id = i.toString()
      this.square.classList.add("empty")
      this.square.classList.add(i)
      grid.appendChild(this.square)
      this.userSquares.push(this.square)
    }
  }

  createBoardCpu(grid: any) {
    for (let i = 0; i < this.width * this.width; i++) {
      this.square = document.createElement('div')
      this.square.classList.add(i)
      this.square.classList.add("empty")
      this.square.dataset.id = i.toString()
      grid.appendChild(this.square)
      this.computerSquares.push(this.square)
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

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
      current.forEach(
        (index: any) =>
          this.computerSquares[randomStart + index].classList.add('taken', ship.name));

      // current.forEach(
      //   (index: any) => 
      //     this.computerSquares[randomStart + index].classList.remove('empty'));

      let direction: string
      (randomDirection) ? direction = 'down' : direction = 'right'
      switch (ship.name) {
        case "destroyer":
          this.layouts[5] = {
            "id": 0,
            "playerId": 0,
            'matchId': 0,
            "shipType": 'destroyer',
            "startLocation": randomStart,
            "direction": direction
          }
          break;
        case "submarine":
          this.layouts[6] = {
            "id": 0,
            "playerId": 0,
            'matchId': 0,
            "shipType": 'submarine',
            "startLocation": randomStart,
            "direction": direction
          }
          break;
        case "cruiser":
          this.layouts[7] = {
            "id": 0,
            "playerId": 0,
            'matchId': 0,
            "shipType": 'cruiser',
            "startLocation": randomStart,
            "direction": direction
          }
          break;
        case "battleship":
          this.layouts[8] = {
            "id": 0,
            "playerId": 0,
            'matchId': 0,
            "shipType": 'battleship',
            "startLocation": randomStart,
            "direction": direction
          }
          break;
        case "carrier":
          this.layouts[9] = {
            "id": 0,
            "playerId": 0,
            'matchId': 0,
            "shipType": 'carrier',
            "startLocation": randomStart,
            "direction": direction
          }
          break;
      }
    }
    else this.generate(ship)
  }

  rotate() {
    console.log(this.isHorizontal)
    if (this.isHorizontal) {
      this.destroyer.classList.toggle('destroyer-container-vertical')
      this.submarine.classList.toggle('submarine-container-vertical')
      this.cruiser.classList.toggle('cruiser-container-vertical')
      this.battleship.classList.toggle('battleship-container-vertical')
      this.carrier.classList.toggle('carrier-container-vertical')
      this.isHorizontal = false
      return
    }
    else if (!this.isHorizontal) {
      this.destroyer.classList.toggle('destroyer-container-vertical')
      this.submarine.classList.toggle('submarine-container-vertical')
      this.cruiser.classList.toggle('cruiser-container-vertical')
      this.battleship.classList.toggle('battleship-container-vertical')
      this.carrier.classList.toggle('carrier-container-vertical')
      this.isHorizontal = true
      return
    }
  }

  dragStart(e: any) {
    this.draggedShip = e.target
    this.draggedShipLength = this.draggedShip.childNodes.length
    console.log("drag start")
    // console.log(e.target)
    // console.log(this)
    // console.log(this.draggedShip)
  }

  dragOver(e: any) {
    e.preventDefault()
  }

  dragEnter(e: any) {
    e.preventDefault()
    this.gridLocation = e.target.dataset.id
  }

  dragLeave() {
    console.log('drag leave')
  }

  dragDrop(e: Event) {
    let shipNameWithLastId = this.draggedShip.lastChild.id
    let shipClass = shipNameWithLastId.slice(0, -2)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
    const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93]
    // const notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60]
    const notAllowedVertical = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]

    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

    this.selectedShipIndex = parseInt(this.selectedShipNameWithIndex.substr(-1))

    // let shipLastId = lastShipIndex + parseInt(this.gridLocation)
    let shipLastId = parseInt(this.gridLocation)

    if (this.isHorizontal)
      shipLastId = (shipLastId + lastShipIndex - this.selectedShipIndex) % 100
    else
      shipLastId = (shipLastId + (lastShipIndex - this.selectedShipIndex) * 10) % 100

    // check to make sure every spot that wants to be interacted with is empty. 
    if (this.isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        if (this.userSquares[parseInt(this.gridLocation) - this.selectedShipIndex + i].classList.contains('taken')) {
          return;
        }
      }
    } else if (!this.isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        if (this.userSquares[parseInt(this.gridLocation) - this.selectedShipIndex * 10 + this.width * i].classList.contains('taken')) {
          return;
        }
      }
    }

    if (this.isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        let pic: string = ''
        if (i == 0) { pic = "HLEdge" }
        else if (i == this.draggedShipLength - 1) { pic = "HREdge" }
        else { pic = "HCenter" }

        this.userSquares[parseInt(this.gridLocation) - this.selectedShipIndex + i].classList.add('taken', shipClass, pic)
        this.userSquares[parseInt(this.gridLocation) - this.selectedShipIndex + i].classList.remove('empty')
      }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!this.isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        let pic: string = ''
        if (i == 0) { pic = "VTEdge" }
        else if (i == this.draggedShipLength - 1) { pic = "VBEdge" }
        else { pic = "VCenter" }

        this.userSquares[parseInt(this.gridLocation) - this.selectedShipIndex * 10 + this.width * i].classList.add('taken', shipClass, pic)
        this.userSquares[parseInt(this.gridLocation) - this.selectedShipIndex * 10 + this.width * i].classList.remove('empty')
      }
    } else return

    // Saves the player layouts to an array to be pushed later. 
    let start = parseInt(this.gridLocation) - this.selectedShipIndex;
    let direction: string
    (this.isHorizontal) ? direction = 'right' : direction = 'down'
    switch (this.draggedShip.firstChild.id) {
      case "destroyer-0":
        this.layouts[0] = {
          "id": 0,
          "playerId": this.user.id,
          'matchId': 0,
          "shipType": 'destroyer',
          "startLocation": start,
          "direction": direction
        }
        break;
      case "submarine-0":
        this.layouts[1] = {
          "id": 0,
          "playerId": this.user.id,
          'matchId': 0,
          "shipType": 'submarine',
          "startLocation": start,
          "direction": direction
        }
        break;
      case "cruiser-0":
        this.layouts[2] = {
          "id": 0,
          "playerId": this.user.id,
          'matchId': 0,
          "shipType": 'cruiser',
          "startLocation": start,
          "direction": direction
        }
        break;
      case "battleship-0":
        this.layouts[3] = {
          "id": 0,
          "playerId": this.user.id,
          'matchId': 0,
          "shipType": 'battleship',
          "startLocation": start,
          "direction": direction
        }
        break;
      case "carrier-0":
        this.layouts[4] = {
          "id": 0,
          "playerId": this.user.id,
          'matchId': 0,
          "shipType": 'carrier',
          "startLocation": start,
          "direction": direction
        }
        break;
    }

    console.log(this.layouts);

    this.displayGrid.removeChild(this.draggedShip)
    this.playerShipCount++;
  }

  dragEnd() {
    console.log('dragend')
  }

  setUpGame() {
    if (this.playerShipCount != 5) {
      console.log("Place more ships.")
      return
    }
    else if (this.gameStarted == true) {
      console.log("The game's already in progress.")
      return
    }
    else {
      this.match.hostId = this.user.id;

      this.gameStarted = true;
      this.playGame()
    }
  }

  playGame() {
    if (this.isGameOver) {
      console.log("The game is over.")
      return
    }
    else if (this.currentPlayer === 'user') {
      console.log("my turn")
      this.turnDisplay.innerHTML = 'Your Turn'
      this.computerSquares.forEach((square: any) => square.addEventListener('click', (e: any) => {
        this.revealSquare(square)
      }))
    }
    else if (this.currentPlayer === 'computer') {
      this.turnDisplay.innerHTML = 'Computers Turn'
      setTimeout(() => this.computerGo(), 500)
      // this.computerGo()
    }
  }

  revealSquare(square: any) {
    if (square.classList.contains('hit') || square.classList.contains('miss')) {
      return;
    }
    else if (square.classList.contains('taken')) {
      // increment count, mark them as HIT, end turn
      square.classList.add('hit')
      if (square.classList.contains('destroyer')) this.destroyerCount++
      if (square.classList.contains('submarine')) this.submarineCount++
      if (square.classList.contains('cruiser')) this.cruiserCount++
      if (square.classList.contains('battleship')) this.battleshipCount++
      if (square.classList.contains('carrier')) this.carrierCount++
    }
    else if (square.classList.contains('empty')) {
      // mark it as miss, end turn
      square.classList.add('miss')
    }

    // [TODO] Add player turn to turns
    let turn: turn = {
      id: 0,
      playerId: this.user.id,
      targetId: 0,
      matchId: 0,
      shotLocation: square.classList[0],
      turnNumber: this.counter
    }
    this.turns.push(turn)
    this.checkForWins()
    this.currentPlayer = 'computer'
    this.playGame()
  }

  computerGo() {
    let random = Math.floor(Math.random() * this.userSquares.length)
    if (!this.userSquares[random].classList.contains('hit') && !this.userSquares[random].classList.contains('miss')) {
      if (this.userSquares[random].classList.contains('destroyer')) {
        this.cpuDestroyerCount++
        this.userSquares[random].classList.add('hit')
      }
      else if (this.userSquares[random].classList.contains('submarine')) {
        this.cpuSubmarineCount++
        this.userSquares[random].classList.add('hit')
      }
      else if (this.userSquares[random].classList.contains('cruiser')) {
        this.cpuCruiserCount++
        this.userSquares[random].classList.add('hit')
      }
      else if (this.userSquares[random].classList.contains('battleship')) {
        this.cpuBattleshipCount++
        this.userSquares[random].classList.add('hit')
      }
      else if (this.userSquares[random].classList.contains('carrier')) {
        this.cpuCarrierCount++
        this.userSquares[random].classList.add('hit')
      }
      else {
        this.userSquares[random].classList.add('miss')
      }
      this.checkForWins()
    } else this.computerGo()

    let turn: turn = {
      id: 0,
      playerId: 0,
      targetId: this.user.id,
      matchId: 0,
      shotLocation: random,
      turnNumber: this.counter
    }
    this.turns.push(turn)

    this.counter++

    // [TODO] Send computer turn to DB
    this.currentPlayer = 'user'
    this.turnDisplay.innerHTML = 'Your Turn'
  }

  checkForWins() {
    if (this.destroyerCount === 2) {
      this.infoDisplay.innerHTML = 'You sunk the computers destroyer'
      this.destroyerCount = 10
    }
    if (this.submarineCount === 3) {
      this.infoDisplay.innerHTML = 'You sunk the computers submarine'
      this.submarineCount = 10
    }
    if (this.cruiserCount === 3) {
      this.infoDisplay.innerHTML = 'You sunk the computers cruiser'
      this.cruiserCount = 10
    }
    if (this.battleshipCount === 4) {
      this.infoDisplay.innerHTML = 'You sunk the computers battleship'
      this.battleshipCount = 10
    }
    if (this.carrierCount === 5) {
      this.infoDisplay.innerHTML = 'You sunk the computers carrier'
      this.carrierCount = 10
    }
    if (this.cpuDestroyerCount === 2) {
      this.infoDisplay.innerHTML = 'You sunk the computers Destroyer'
      this.cpuDestroyerCount = 10
    }
    if (this.cpuSubmarineCount === 3) {
      this.infoDisplay.innerHTML = 'You sunk the computers Submarine'
      this.cpuSubmarineCount = 10
    }
    if (this.cpuCruiserCount === 3) {
      this.infoDisplay.innerHTML = 'You sunk the computers Cruiser'
      this.cpuCruiserCount = 10
    }
    if (this.cpuBattleshipCount === 4) {
      this.infoDisplay.innerHTML = 'You sunk the computers Battleship'
      this.cpuBattleshipCount = 10
    }
    if (this.cpuCarrierCount === 5) {
      this.infoDisplay.innerHTML = 'You sunk the computers Carrier'
      this.cpuCarrierCount = 10
    }
    if ((this.destroyerCount + this.submarineCount + this.cruiserCount + this.battleshipCount + this.carrierCount) === 50) {
      this.infoDisplay.innerHTML = "YOU WIN"
      this.match.winnerId = this.user.id
      this.user.totalWins++
      this.gameOver()
    }
    if ((this.cpuDestroyerCount + this.cpuSubmarineCount + this.cpuCruiserCount + this.cpuBattleshipCount + this.cpuCarrierCount) === 50) {
      this.infoDisplay.innerHTML = "COMPUTER WINS"
      this.match.winnerId = 0
      this.gameOver()
    }
  }

  gameOver() {
    // Send Match to DB
    // Receive Match from DB (to get ID), possibly in the Send call?
    // Add matchId to Layouts
    // Send Layouts to DB. 
    // Send Turns to DB. 
    if (!this.isGameOver) {
      console.log(this.user.totalMatches);
      this.user.totalMatches++;
      this.match.turnCount = this.counter;
      this.armAPI.addMatch(this.match).then(
        (match) => {
          this.layouts.forEach(layout => {
            layout.matchId = match.id;
            this.armAPI.addLayout(layout)
          });
          this.turns.forEach(turn => {
            turn.matchId = match.id;
            this.armAPI.addTurn(turn)
          });
        }
      )
      this.armAPI.updateUser(this.user)
    }

    this.isGameOver = true
    this.startButton.removeEventListener('click', this.playGame)
    this.content.disabled = false
  }

  goHome(): void {
    this.router.navigateByUrl('home/:name')
  }
}