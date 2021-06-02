// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// RXJS
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, of, Subscription } from 'rxjs';
// NGRX
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const arabeRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `de 0 ${length}`; }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} jusqu'a ${length}`;
}
// Services

@Component({
  selector: 'kt-wifi-list',
  templateUrl: './wifi-list.component.html',
  styleUrls: ['./wifi-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WifiListComponent implements OnInit, OnDestroy {
  form: FormGroup;
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
      libelle: "Number of Interfaces",
      data: [

      ],
    },

    {
      id: 2,
      libelle: 'Features',

      data: [
        { name: 'FibeTV' },
        { name: 'Wireless scan' },
        { name: 'BLACKLISTED' },
        { name: 'Zigbee' },
        { name: 'AdHoc Scan' },
        { name: 'Tx/Rx : powersave' },
        { name: 'Checksum' },
        { name: 'WEATHER CHANNELS' },
        { name: 'LTQW-wave' },
        { name: 'fast romaing' },
        { name: 'DFS_CHANNELS' },
        { name: 'ASCD' },
        { name: 'Frame burst' },
        { name: 'MSC' },
        { name: 'ASC History' },
        { name: 'Suberegion' },
      ],
    },
    {
      id: 3,
      libelle: 'SSID',
      data: [
        { name: 'primary' },
        { name: 'guest' },
        { name: 'Checksum scan' },
        { name: 'status' },
        { name: 'debug' },
      ],
    },
    {
      id: 4,
      libelle: 'Chipset',
      data: [
        { name: 'Broadcom' },
        { name: 'Quantenna' },
        { name: 'Atheros' },
      ],
    },
    {
      id: 5,
      libelle: 'Access Point',
      data: [
        { name: 'MAC Filtering' },
        { name: 'Security' },
        { name: 'WPS' },
        { name: 'IDLE' },
        { name: 'band steering devices' },
        { name: 'monitoring system' },
      ],

    },
    {
      id: 5,
      libelle: 'End Point',
      data: [
        { name: 'WME' },
        { name: 'WDS' },
        { name: 'WPS' },
        { name: 'IDLE' },
        { name: 'band steering devices' },
        { name: 'monitoring system' },
      ],

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
    public http: HttpClient,
    private fb: FormBuilder,
  ) { }


  ngOnInit() {
    this.createForm();
    this.paginator._changePageSize(5);
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.wifi);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'ligne(s) par page';
    this.paginator._intl.nextPageLabel = "page suivante ";
    this.paginator._intl.lastPageLabel = "dernière page";
    this.paginator._intl.previousPageLabel = " page précédente";
    this.paginator._intl.getRangeLabel = arabeRangeLabel;
  }


  createForm() {
    this.form = this.fb.group({
      libelle: ['', Validators.compose([
        Validators.required,
      ])
      ],

    })
  }

  onSubmit() {
    const controls = this.form.controls;
    /** check form */
    if (this.form.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    ;
    this.form.value.id = (this.wifi.length + 1) - 1;
    this.wifi.push(this.form.value);
    this.dataSource.data = this.wifi;
    this.ngAfterViewInit();
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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        for (let elem of this.wifi) {
          if (elem.libelle == result.wifi) {
            elem.data.push(result.data)
            this.dataSource.data=this.wifi;
          }
        }
      }
    }
    )
    //   localStorage.setItem("array",JSON.stringify(this.wifi))
    // this.wifi=this.wifi;
    //   console.log(this.wifi)
    //   this.wifi = JSON.parse(localStorage.getItem("array"));
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

