import { Subscription } from 'rxjs'

import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'

@Component({
  selector: 'a13-pickup-image-dialog',
  templateUrl: './pickup-image-dialog.component.html',
  styleUrls: ['./pickup-image.component.scss']
})
export class PickupImageDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PickupImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.data.imageList = this.data.imageList.map((elem: any) => {
      return { id: elem, selected: elem === this.data.image }
    })
  }

  pickup(img: any): void {
    this.deselect()
    img.selected = true
    this.dialogRef.close(img.id)
  }

  deselect(): void {
    this.data.imageList.forEach((elem: any) => {
      elem.selected = false
    })
  }
}

@Component({
  selector: 'a13-pickup-image',
  templateUrl: './pickup-image.component.html',
  styleUrls: ['./pickup-image.component.scss']
})
export class PickupImageComponent implements OnInit, OnDestroy {

  @Input() image: any
  @Input() imageList: any[]
  @Output() imageChange: any = new EventEmitter<boolean>()

  dialogSubscription: Subscription

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  pickup(): void {
    const dialogRef = this.dialog.open(PickupImageDialogComponent, {
      maxWidth: '585px',
      data: {
        imageList: this.imageList,
        image: this.image
      }
    })

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      this.image = result ? result : this.image
      this.imageChange.emit(this.image)
    })
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe()
    }
  }

}
