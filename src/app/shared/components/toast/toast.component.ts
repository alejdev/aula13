import { Component, OnInit, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA } from '@angular/material'

@Component({
  selector: 'a13-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit() { }

  case(messageType: string): boolean {
    const reg = RegExp('[info|warning|error]', 'g')
    return reg.test(messageType)
  }

}
