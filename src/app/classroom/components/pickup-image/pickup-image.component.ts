import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material'

import { UtilService } from 'src/app/shared/services/util.service'

@Component({
  selector: 'a13-pickup-image-dialog',
  templateUrl: './pickup-image-dialog.component.html',
  styleUrls: ['./pickup-image.component.scss']
})
export class PickupImageDialogComponent implements OnInit {

  srcImage: any

  constructor(
    public dialogRef: MatDialogRef<PickupImageDialogComponent>,
    private utilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.data.imageList.forEach((elem: any) => {
      if (elem.id === this.data.image.id) {
        elem.selected = true
      }
    })
    this.srcImage = this.utilService.srcImage
  }

  pickup(img: any) {
    this.deselect()
    img.selected = true
    this.dialogRef.close(img)
  }

  deselect() {
    this.data.imageList.forEach((elem: any) => {
      delete elem.selected
    })
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
  srcImage: any

  constructor(
    private dialog: MatDialog,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.srcImage = this.utilService.srcImage
  }

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
