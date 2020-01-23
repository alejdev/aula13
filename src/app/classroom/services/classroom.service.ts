import { Injectable } from '@angular/core'
import { take } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

import { LoaderService } from 'src/app/shared/services/loader.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private ref: AngularFirestoreCollection = this.firestore.collection('users')
  private subRefName: string = 'classrooms'
  private cachedClassroomList: any[] = []

  constructor(
    private firestore: AngularFirestore,
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  public mapClassroom(data: any): any {
    return {
      id: data.payload.id,
      ...data.payload.data()
    }
  }

  public mapClassroomList(data: any): any {
    return data.map((elem: any) => {
      return {
        id: elem.payload.doc.id,
        ...elem.payload.doc.data()
      }
    }).sort(UtilService.compare)
  }

  public observeClassroomList(): any {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName, ref => ref.orderBy('name', 'desc'))
      .snapshotChanges()
  }

  public getClassroomList(): any {
    this.loaderService.start()
    return this.observeClassroomList()
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public getCachedClassroomList(): any {
    return this.cachedClassroomList
  }

  public setCachedClassroomList(cachedClassroomList: any[]): void {
    this.cachedClassroomList = cachedClassroomList
  }

  public createClassroom(data: any): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .add(data)
      .finally(() => this.loaderService.stop())
  }

  public observeClassroom(id: string): any {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).snapshotChanges()
  }

  public readClassroom(id: string): any {
    this.loaderService.start()
    return this.observeClassroom(id)
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public updateClassroom(id: string, classroom: any): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.set(classroom)
      .finally(() => this.loaderService.stop())
  }

  public deleteClassroom(id: string): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.delete()
      .finally(() => this.loaderService.stop())
  }

}
