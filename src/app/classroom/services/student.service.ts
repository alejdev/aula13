import firebase from 'firebase/app'
import moment from 'moment'
import { Observable } from 'rxjs'
import { Student } from 'src/app/core/interfaces'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private subCollectionName: string = 'students'
  private _cachedStudentList: Student[] = []

  constructor(
    private firestore: AngularFirestore,
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  // Collections
  private get userData(): AngularFirestoreDocument {
    return this.firestore.collection('users').doc(this.authService.userUid)
  }

  private get subCollection(): AngularFirestoreCollection {
    return this.userData.collection(this.subCollectionName)
  }

  public get cachedStudentList(): Student[] {
    return this._cachedStudentList
  }

  public set cachedStudentList(list: Student[]) {
    this._cachedStudentList = list
  }

  // Observables
  public observeStudentList(): Observable<any> {
    return this.userData
      .collection(this.subCollectionName, ref => {
        return ref
          .orderBy('favorite', 'desc')
          .orderBy('personal.name')
      })
      .snapshotChanges()
  }

  public observeStudent(id: string): Observable<any> {
    return this.subCollection.doc(id).snapshotChanges()
  }

  // Promises
  public async queryEnrrolledStudents(property: string, classroom: string): Promise<any> {
    this.loaderService.load()
    const students = await this.userData
      .collection(this.subCollectionName,
        ref => ref.where(property, 'array-contains', classroom)
      )
      .get().toPromise()
    this.loaderService.down()
    return UtilService.mapCollection(students)
  }

  public async getStudentList(): Promise<any> {
    this.loaderService.load()
    const students = await this.subCollection.get().toPromise()
    this.loaderService.down()
    return UtilService.mapCollection(students)
  }

  public createStudent(data: Student): Promise<any> {
    this.loaderService.load()
    return this.subCollection.add(data)
      .finally(() => this.loaderService.down())
  }

  public async readStudent(id: string): Promise<any> {
    this.loaderService.load()
    const student = await this.subCollection.doc(id).get().toPromise()
    this.loaderService.down()
    return UtilService.mapDocument(student)
  }

  public updateStudent(id: string, student: any): Promise<any> {
    this.loaderService.load()
    return this.subCollection.doc(id).ref.set(student)
      .finally(() => this.loaderService.down())
  }

  public updateStudentBatch(students: Student[]): Promise<any> {
    this.loaderService.load()
    const batch = firebase.firestore().batch()
    students
      .filter(student => student)
      .forEach((student: Student) => {
        const ref = this.subCollection.doc(student.id).ref
        delete student.id
        batch.update(ref, student)
      })
    return batch.commit()
      .finally(() => this.loaderService.down())
  }

  public deleteStudent(id: string): Promise<any> {
    this.loaderService.load()
    return this.subCollection.doc(id).ref.delete()
      .finally(() => this.loaderService.down())
  }

  // Normalize Student for save
  public normalizeStudent(student: Student): Student {
    return {
      archived: !!student.archived,
      classroom: {
        classrooms: student.classroom.classrooms || [],
        subjects: student.classroom.subjects || []
      },
      contactInformation: {
        phones: student.contactInformation.phones || []
      },
      favorite: !!student.favorite,
      musical: {
        course: student.musical.course || null,
        instrument: student.musical.instrument || null,
        teacher: student.musical.teacher || ''
      },
      personal: {
        academicCourse: student.personal.academicCourse || null,
        avatar: student.personal.avatar,
        birthdate: this.formatOutputDate(student.personal.birthdate),
        name: UtilService.capitalize(student.personal.name),
        observations: student.personal.observations || ''
      }
    }
  }

  public formatInputDate(date: any): any {
    if (date) {
      return moment(date, 'DD/MM/YYYY')
    }
    return ''
  }

  public formatOutputDate(date: any): any {
    if (date && date._isAMomentObject && date._isValid) {
      return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY')
    }
    return date
  }

}
