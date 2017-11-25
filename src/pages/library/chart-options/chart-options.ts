
import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-chart-options',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h3>Store and Load</h3>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button 
                  outline 
                  (click)="onAction('load')">Load Charts
          </button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button 
                  outline
                  (click)="onAction('store')">Save Charts
          </button>
        </ion-col>
      </ion-row> 
    </ion-grid>
  `
})

export class ChartOptionsPage {

  constructor(private viewCtrl: ViewController) {

  }

  onAction(action: string){
    this.viewCtrl.dismiss({action: action});
  }
}
