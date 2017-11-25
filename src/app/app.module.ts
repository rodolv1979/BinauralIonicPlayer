import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {SettingsPage} from "../pages/settings/settings";
import {FavoritesPage} from "../pages/favorites/favorites";
import {QuotePage} from "../pages/quote/quote";
import {LibraryPage} from "../pages/library/library";
import {QuotesPage} from "../pages/quotes/quotes";
import {TabsPage} from "../pages/tabs/tabs";
import {QuotesService} from "../services/quotes";
import {SettingsService} from "../services/settings";
import {SignupPage} from "../pages/signup/signup";
import {SigninPage} from "../pages/signin/signin";
import {AuthService} from "../services/auth";
import {ChartOptionsPage} from "../pages/library/chart-options/chart-options";
import { HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    FavoritesPage,
    QuotePage,
    QuotesPage,
    LibraryPage,
    TabsPage,
    SignupPage,
    SigninPage,
    ChartOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    QuotesPage,
    LibraryPage,
    QuotePage,
    FavoritesPage,
    TabsPage,
    SignupPage,
    SigninPage,
    ChartOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuotesService,
    SettingsService,
    AuthService
  ]
})
export class AppModule {}
