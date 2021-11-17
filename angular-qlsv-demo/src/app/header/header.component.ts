import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

}
