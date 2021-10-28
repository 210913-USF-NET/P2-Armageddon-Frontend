import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ready',
  templateUrl: './ready.component.html',
  styles: [
  ]
})
export class ReadyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToBoard(): void {
    this.router.navigateByUrl(`board`);
  }

}
