import { Component } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './providers/api.service';

import { Router } from '@angular/router';
import { ActiveGuard } from './providers/services/active.guard';
import { Subscription } from 'rxjs';
import { runInThisContext } from 'vm';
import { Network } from '@ionic-native/network/ngx';
import { ServicesService } from './providers/services/services.service';
import { TranslateService } from '@ngx-translate/core';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  pages: Array<{ title: string, component: any }>;

  activepages: any;
  navigate: any;
  subscription: any;
  cur_path: any;
  forgotPassword: any;
  path: any;
  activeTab: any;
  public logoutAlert: boolean = false;
  public exitAppAlert: boolean = false;
  currentUser: any;
  rootPage: any;
  pubcounter = 0;
  private backBtnSubscriber: Subscription;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  menuPages: any;
  tabPages: any;

  selectedLanguage:any;

  public appMenu = [
    { title: "View Candidate", url: '/view-candidate', icon: 'people-outline' },
    { title: "Courses", url: '/view-courses', icon: "create-outline" },
    { title: "View Jobs", url: '/view-jobs', icon: "document-text-outline" },
    { title: "About Us", url: '/about', icon: "information-circle-outline" },
    { title: "Help", url: '/help', icon: "help-circle-outline" }
  ];

  public tabOptions = [
    { title: "View Candidate", url: './view-candidate', icon: 'people-outline' },
    { title: "Settings", url: '/setting', icon: 'settings-outline' },
    { title: "My Profile", url: '/my-profile', icon: 'person-circle-outline' },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public alertCtrl: AlertController,
    public activeguard: ActiveGuard,
    private navCtrl: NavController,
    private network:Network,
     private service:ServicesService,
     private translate:TranslateService,
     private fcm:FCM
    
  ) {
    this.initializeApp();

    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // stop connect watch
    connectSubscription.unsubscribe();


    this.router.events.subscribe((res) => {
      this.path = router.url;
      this.cur_path = this.path.includes('login') || this.path.includes('forgot-password') || this.path.includes('landing-screen');
      console.log("path", this.path, this.cur_path);

    
       this.platform.backButton.subscribeWithPriority(1, () => {
      if (this.router.url.indexOf('/login') >= 0) {
        navigator['app'].exitApp();
      }
        if(this.path=='/view-candidate'||this.path=='/view-courses'||this.path=='/view-jobs'||this.path=='/about'||this.path=='/help' 
            ||this.path=='/setting'||this.path=='/my-profile' ){
          console.log("In Root Pages..");
          this.exitConfirm()
        }
        else{
            console.log("Back btn press....")
            this.navCtrl.back();
        }
      })
    });

    platform.ready().then(() => {})
  }


  initializeApp() {
    console.log("Initialize app....................>>>>>>>>>>>>>>>>>>")
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.statusBar.overlaysWebView(false);
      // set status bar 
      this.statusBar.backgroundColorByHexString('#ffa848');

      this.service.setInitialAppLanguage();
      this.selectedLanguage=localStorage.getItem('SELECTED_LANGUAGE')
      console.log("Selected Language is....<<<<<<<",this.selectedLanguage);
      this.service.setLanguage(this.selectedLanguage)
    })


    this.fcm.getToken().then(token => {
      console.log(token);
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
     
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      //  this.router.navigate([data.landing_page, data.price]);
      } else {
        console.log('Received in foreground');
      //  this.router.navigate([data.landing_page, data.price]);
      }
    });

  
  }


  logout() {
    this.alert();
  }

  async alert() {
    let titleTxt: string = this.translate.instant('Confirm Logout');
    let alertMsg: string = this.translate.instant('Do you want to Logout?');
    let alertYesBtn: string = this.translate.instant('Yes');
    let alertNoBtn: string = this.translate.instant('No');

    let alert = await this.alertCtrl.create({
      header: titleTxt,
      message: alertMsg ,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: alertNoBtn,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.logoutAlert = false;
          }
        },
        {
          text: alertYesBtn,
          handler: () => {
            console.log('Yes clicked');
            localStorage.clear();
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });
    alert.present().then(() => {
      this.logoutAlert = true;
    });
  }

  async exitConfirm() {
    let titleTxt: string = this.translate.instant('Confirm Exit');  
    let alertMsg: string= this.translate.instant('Do you want to Exit?');
    let alertYesBtn: string = this.translate.instant('Yes');
    let alertNoBtn: string = this.translate.instant('No');

    let alert = await this.alertCtrl.create({
      header: titleTxt,
      message: alertMsg,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: alertNoBtn,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.exitAppAlert = false;
          }
        },
        {
          text: alertYesBtn,
          handler: () => {
            console.log('Yes clicked');
            navigator['app'].exitApp();
          }
        }
      ]
    });
    alert.present().then(() => {
      this.exitAppAlert = true;
    });
  }
}





