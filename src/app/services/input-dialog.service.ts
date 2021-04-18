import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Item } from '../models/models';
import { GroceriesService } from './groceries.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(private toastController: ToastController, private alertController: AlertController, private groceryService: GroceriesService) { }

  /**
   * Add/Edit an item via alert dialog prompt.
   * @param item the item to edit. Optional if adding.
   * @param index the item index. Optional if adding.
   * @param message optional message. Can be used for displaying error message.
   */
  public async showPrompt(item?: Item, index?: number, message?: string) {
    const isEdit = item && index != undefined;
    const prompt = await this.alertController.create({
      header: isEdit ? "Edit Item" : "Add Item",
      message: message,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item?.name,
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          value: item?.quantity,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: isEdit ? 'Save' : 'Add',
          handler: async (item: Item) => {
            if (this.validateItem(item)) {
              if (isEdit) {
                this.groceryService.editItem(item, index);
              }
              else {
                this.groceryService.addItem(item);
              }

              const toast = await this.toastController.create({
                message: `${isEdit ? 'Saved' : 'Added'} Item: ${item.name}, Quantity ${item.quantity}`,
                duration: 3000
              });
              await toast.present();
            }
            else {
              // Show the prompt again, if the item is not valid.
              this.showPrompt(item, index, "Please eneter valid data");
            }
          }
        }
      ]
    });

    await prompt.present();
  }

  private validateItem(item: Item) {
    return item && item.name.length && item.quantity > 0;
  }
}

