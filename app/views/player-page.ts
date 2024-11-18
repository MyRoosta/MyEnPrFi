import { EventData, Page } from '@nativescript/core';
import { PlayerViewModel } from '../viewmodels/player-view-model';

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new PlayerViewModel();
}