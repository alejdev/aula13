import { Component, Input, OnInit } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material'

@Component({
  selector: 'a13-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss']
})
export class MenuOptionsComponent implements OnInit {

  @Input() options: any
  @Input() lightColor?: any = false
  @Input() buttonSize?: number = 18

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  openDialog(component: any, config: MatDialogConfig) {
    if (component && config) {
      this.dialog.open(component, config)
    }
  }
}
