import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { LangService } from './shared/lang.service';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { ApiService } from './shared/api.service';
import { UserService } from './shared/user.service';
import { ActiveGuard } from './shared/active.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = environment.isMultiColorActive;
  constructor(private langService: LangService, private renderer: Renderer2, private api : ApiService,
              public userservice:UserService,public activeguard:ActiveGuard) {

  }

  ngOnInit() {
    this.langService.init();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.addClass(document.body, 'show');
    }, 1000);
    setTimeout(() => {
      this.renderer.addClass(document.body, 'default-transition');
    }, 1500);
  }
}
