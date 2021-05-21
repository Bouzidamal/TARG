import { Component, OnInit, Input, Inject, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
export interface MenuOptions { header?: any; }
@Component({
  selector: 'kt-details',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent implements OnInit {
  @Input() options: MenuOptions;
  tabChecked = [];
  selectedItemsList: any = [];
  checked = [];
  listWifi: any = [];
  form: FormGroup;
  @ViewChildren('checkBox') checkBox: QueryList<any>;
  /**@param dialogRef  
*  @param data     
*   */
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }
  /**     * Close dialog with false result     */
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
      ])
      ],
      numero: ['', Validators.compose([
     
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
    console.log(this.form.value)


    this.dialogRef.close({ data: this.form.value, wifi: this.data.element.libelle });

  }
  checkCheckBoxvalue(checkbox) {
    this.checked = [];
    const checked = this.checkBox.filter(checkbox => checkbox.checked);
    checked.forEach(data => {
      this.checked.push({
        'checked': data.checked,
        'value': data.value.name
      })
    })
  }
}
