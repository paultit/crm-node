import { CompileMetadataResolver } from "@angular/compiler";

export interface OverviewPage {
  orders: OverviewPageItem;
  gain: OverviewPageItem
}

export interface OverviewPageItem {
  percent: number,
  compare: number,
  yersterday: number,
  isHigher: boolean
}
