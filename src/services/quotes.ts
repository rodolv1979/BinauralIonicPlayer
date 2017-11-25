import { Quote } from '../data/quote.interface';
import { Http, Response } from '@angular/http';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth";
import 'rxjs/Rx';

@Injectable()
export class QuotesService {
  private favoriteQuotes: Quote[] = []

  constructor(private http: Http,
              private authService: AuthService) {}

  addQuoteToFavorites(quote: Quote) {
    this.favoriteQuotes.push(quote);
  }

  removeQuoteFromFavorites(quote: Quote) {
    const position = this.favoriteQuotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.favoriteQuotes.splice(position, 1);
  }

  getFavoriteQuotes() {
    return this.favoriteQuotes.slice();
  }

  isQuoteFavorite(quote: Quote) {
    return this.favoriteQuotes.find((quoteEl: Quote) => {
      return quoteEl.id === quote.id;
    });
  }

  storeQuotesList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    // The Http request return an Observable! Actually
    // We need to subscribe to it. Normal Angular behavior.
    return this.http
      .put('https://voithmanagersionic.firebaseio.com/' + userId +
          'quotes-list.json?auth='+token, this.favoriteQuotes)
      .map((response: Response) => {
        return response.json();
    });
  }

  fetchQuotesList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .get('https://voithmanagersionic.firebaseio.com/' + userId +
        'quotes-list.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((data) => {
        this.favoriteQuotes = data;
      });
  }
}


  // ?auth=' + token
