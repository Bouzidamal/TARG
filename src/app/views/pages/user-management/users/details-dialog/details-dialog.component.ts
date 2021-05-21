import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
export interface MenuOptions { header?: any; }
@Component({
  selector: 'kt-details',
  templateUrl: './details-dialog.component.html',
  // styleUrls: ['./participant-view.component.scss']
})
export class DetailsDialogComponent implements OnInit {
  @Input() options: MenuOptions;


  /**@param dialogRef  
*  @param data     
*   */
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }
  /**     * Close dialog with false result     */
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
console.log('fffff')
    console.log(this.data,'fffff')
  }
}
