import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = "HomePage";

  pages: Array<{title: string, component: string, icon: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService) {
    
    this.initializeApp();
    
    this.pages = [
      { title : 'Principal', component: 'PrincipalPage', icon: 'ios-home'},
      { title : 'Cadastros', component: 'CadastrosPage', icon: 'ios-clipboard'},
      { title : 'Reservas', component: 'ReservasPage', icon: 'ios-calendar'},
      { title : 'Consultas', component: 'SearchPage', icon: 'ios-bookmarks'},
      { title : 'Relatório', component: 'RelatoriosPage', icon: 'ios-list-box'},
      { title : 'Logout', component : '', icon: 'ios-exit'}
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title:string, component:string}) {
    switch (page.title) {
      case 'Logout':
        this.auth.logout();
        console.log("logout...")
        this.nav.setRoot('HomePage');
        break;

      default:
        this.nav.setRoot(page.component);
    }
  }
}
