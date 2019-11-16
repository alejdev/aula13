import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material'

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
    this.data.imageList.forEach((elem: any) => {
      if (elem.src === this.data.image.src) {
        elem.selected = true
      }
    })
  }

  pickup(img: any) {
    this.deselect()
    img.selected = true
    this.data.image = img
  }

  deselect() {
    this.data.imageList.forEach((elem: any) => {
      delete elem.selected
    })
  }

  save() {
    this.dialogRef.close(this.data.image)
  }
}

@Component({
  selector: 'a13-pickup-image',
  templateUrl: './pickup-image.component.html',
  styleUrls: ['./pickup-image.component.scss']
})
export class PickupImageComponent implements OnInit {

  @Input() image: any
  @Input() imageList: any
  @Output() imageChange: any = new EventEmitter<boolean>()

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  pickup() {
    const dialogRef = this.dialog.open(PickupImageDialogComponent, {
      maxWidth: '585px',
      data: {
        imageList: this.imageList,
        image: this.image
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.image = result ? result : this.image
      this.imageChange.emit(this.image)
    })
  }

}
