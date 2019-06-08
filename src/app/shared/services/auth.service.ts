import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService: AngularFireAuth, private router: Router) { }

  public register(control: any) {
    this.authService.auth
      .createUserWithEmailAndPassword(control.email, control.password)
      .then((result: any) => {
        this.router.navigate(['lugares'])
      })
      .catch((error: any) => console.log(error))
  }

}
