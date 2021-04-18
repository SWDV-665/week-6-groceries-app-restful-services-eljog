import { Injectable } from '@angular/core';
import { Item } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  private items: Item[] = [];
  constructor() { }

  /**
   * Remove the item at given index.
   * @param index item index.
   */
  public removeItem(index: number) {
    this.items.splice(index, 1);
  }

  /**
   * Add a new item.
   * @param item the item to add.
   */
  public addItem(item: Item) {
    this.items.push(item);
  }

  /**
   * Update the item at given index.
   * @param item the item to update.
   * @param index item index.
   */
  public editItem(item: Item, index: number) {
    this.items[index] = item;
  }

  /**
   * Get a list of all the items
   * @returns list of items
   */
  public getItems(): Item[] {
    return this.items;
  }
}
