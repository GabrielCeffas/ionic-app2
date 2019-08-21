import { Storage } from '@ionic/storage';
import { CashService } from './../../services/cash.service';
import { CashFlowModalPage } from './../cash-flow-modal/cash-flow-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  
  selectedCurrency = '';
  transactions = [];

  constructor(private modalCtrl: ModalController, private cashService: CashService,
    private plt: Platform, private storage: Storage) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    await this.plt.ready(); //Tempo para os plugins lerem
    this.loadTransactions();
  }

  async addCashFlow(){
    let modal = await this.modalCtrl.create({
      component: CashFlowModalPage, 
      cssClass: 'modalCss'
    });
    modal.present();
    
    modal.onDidDismiss().then(res=> {
      if(res && res.data){
        this.loadTransactions();
      }
    })
  }
  
  async loadTransactions(){
    await this.storage.get('selected-currency').then(currency => {
      this.selectedCurrency = currency;
    });
    this.cashService.getTransactions().then(trans => {
      this.transactions = trans;
    });
  }

}
