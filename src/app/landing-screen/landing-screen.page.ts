import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.page.html',
  styleUrls: ['./landing-screen.page.scss'],
})
export class LandingScreenPage implements OnInit {

  sliders=[
    // {img:"assets/img/slide1.png"},
    // {img:"assets/img/slide2.png"},
    // {img:"assets/img/slide3.png"},
    {img:"assets/img/Intro-1.png"},
    {img:"assets/img/Intro-2.png"},
    {img:"assets/img/Intro-3.png"},
  ]

  slideOpt = {
    loop: true,
    autoplay:true
  };
  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToLogin(){  
    console.log("click")
      this.router.navigate(['/login']);
  }

}
