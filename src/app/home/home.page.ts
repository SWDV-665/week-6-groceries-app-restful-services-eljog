import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Item } from '../models/models';
import { GroceriesService } from '../services/groceries.service';
import { InputDialogService } from '../services/input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  title = "Grocery"

  constructor(private toastController: ToastController, private groceryService: GroceriesService, private inputDialogService: InputDialogService, private socialSharing: SocialSharing) { }

  public loadItems() {
    return this.groceryService.getItems();
  }

  /**
   * API to trigger adding an item.
   */
  public async addItem() {
    await this.inputDialogService.showPrompt();
  }

  /**
   * Remove the item at given index.
   * @param index item index.
   */
  public async removeItem(index: number) {
    const toast = await this.toastController.create({
      message: 'Removing Item',
      duration: 3000
    });
    await toast.present();

    this.groceryService.removeItem(index);

  }

  /**
   * Edit the item at given index.
   * @param item the item to edit
   * @param index item index.
   */
  public async editItem(item: Item, index: number) {
    const toast = await this.toastController.create({
      message: 'Editing Item',
      duration: 3000
    });
    await toast.present();

    await this.inputDialogService.showPrompt(item, index);
  }

  /**
 * API to share an item.
 */
  public async shareItem(item: Item) {
    console.log("Sharing", item);
    const message = `Grocery Item- Name: ${item.name}, Qty: ${item.quantity}`;
    try {
      await this.socialSharing.share(message)
      console.log('Successfully shared', item);
    } catch (e) {
      console.error('Sharing failed', e);
    }
  }
}
