import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../../models/ingredient.model";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromShoppingList from "./store/shopping-list.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Observable<{ ingredients: Ingredient[] }>;

  private igAddSubscription: Subscription;

  constructor(
    private store: Store<fromShoppingList.AppState>,
  ) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  public onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    this.igAddSubscription?.unsubscribe();
  }
}
