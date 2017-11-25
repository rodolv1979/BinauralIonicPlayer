import {Component, OnInit} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import {QuotesPage} from "../quotes/quotes";
import { Quote } from '../../data/quote.interface'
import quotes from '../../data/quotes'
import { ChartOptionsPage } from "./chart-options/chart-options";
import {AuthService} from "../../services/auth";
import {QuotesService} from "../../services/quotes";

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage implements OnInit {
  quoteCollection: {category: string, quotes: Quote[], icon: string}[];
  quotesPage = QuotesPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private quotesService: QuotesService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibraryPage');
  }

  ngOnInit() {
    this.quoteCollection = quotes;
  }

  onShowOptions(evt) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(ChartOptionsPage);
    popover.present({ev: evt});
    popover.onDidDismiss(
      data =>{
        if (!data) {
          return;
        }
        if (data.action === 'load') {
          loading.present();
          this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.quotesService.fetchQuotesList(token)
                .subscribe(
                  (list: Quote[]) => {
                    console.log(list);
                    loading.dismiss();
                  },
                  error => {
                    loading.dismiss();
                    this.handleError(error.json().error);
                  }
                );
            }
          );
      } else if (data.action == 'store') {
        // Firebase getting up for us the token but it is not
        // a simple string, actually it returns a Promise.
        // What it is happening behind the scenes with getToken() is that
        // more complicated than using this simple command. Actually,
        // 1) It checks  in the local storage and retrieve the token;
        // 2) It will check if the token is still valid;
        // 2.1) If the token is expired, the same method
        // will try to refresh it for us
        loading.present();
        this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.quotesService.storeQuotesList(token)
                .subscribe(
                  () => loading.dismiss(),
                  error => {
                    loading.dismiss();
                    this.handleError(error.json().error);
                  }
                );
            }
          );
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An Error occured!',
      message: errorMessage,
      buttons: ['Ok'],
    });
    alert.present();
  }
}
