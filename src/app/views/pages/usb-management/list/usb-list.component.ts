// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
// RXJS
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, of, Subscription } from 'rxjs';
// NGRX
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
// Services

@Component({
  selector: 'kt-wifi-list',
  templateUrl: './usb-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsbListComponent implements OnInit, OnDestroy {

  selection = new SelectionModel(true, []);
  displayedColumns = ['select', 'id', 'libelle', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  private subscriptions: Subscription[] = [];
  wifi: any = [

    {
      id: 1,
      libelle: 'Switch Data'
    },
    {
      id: 2,
      libelle: 'VOIPHG6' },

    {
      id: 3,
      libelle: 'VOIPHG6'
    },
    {
      id: 4,
      libelle: 'Eco mode'
    },
    {
      id: 5,
      libelle: 'Storage :extra'
    },
    {
      id: 6,
      libelle: 'DVCDISC'
    },
    {
      id: 7,
      libelle: 'RT ….'
    },
    {
      id: 8,
      libelle: 'Video'
    },
    {

      id: 9,
      libelle: 'Wwan'
    },
    {
      id: 10,
      libelle: 'Printer'
    },
    {
      id: 11,
      libelle: 'Serial'
    },
    {
      id: 12,
      libelle: 'HCD'
    },
    {
      id: 13,
      libelle: 'Net'
    },
    {
      id: 14,
      libelle: 'Ncm'
    },
    {
      id: 15,
      libelle: 'ACM /ATM'
    },
    {
      id: 16,
      libelle: 'dwc3'
    },
    {
      id: 17, libelle: 'HID'
    },

    {
      id: 18,
      libelle: 'ledtrig-usbdev'
    },
    {
      id: 19,
      libelle: 'busybox'
    },
    {
      id: 20,
      libelle: 'USB Battery'
    },



  ];



  dataSource = new MatTableDataSource(this.wifi);
  /**
   * Component constructor
   *
   * @param store: Store<AppState>
   * @param dialog: MatDialog
   * @param snackBar: MatSnackBar
   * @param layoutUtilsService: LayoutUtilsService
   */
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }


  ngOnInit() {
    //this.dataSource=new dataSource(this.wifi)

  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
  /**
   * Check all rows are selected
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.subscriptions.length;
    return numSelected === numRows;
  }

  details(element): void {
    //  let obj = this.selection;
    //   if ($event.checked == true) {
    let dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '450px',
      data: { element }
    })
    // }
  }



  /**
   * Toggle selection
   */
  masterToggle() {
    if (this.selection.selected.length === this.subscriptions.length) {
      this.selection.clear();
    } else {
      this.subscriptions.forEach(row => this.selection.select(row));
    }
  }
}

