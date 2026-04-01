import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent implements OnInit {

  routes = [
    { id: 3, name: 'test route 1', totalPoints: 3 },
    { id: 2, name: 'divakar pg', totalPoints: 2 },
    { id: 1, name: 'NickName', totalPoints: 17 }
  ];

  ngOnInit(): void {}
}