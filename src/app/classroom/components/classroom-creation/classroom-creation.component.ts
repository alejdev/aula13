import { Component, OnInit, Inject, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime, switchMap } from 'rxjs/operators'

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { UtilService } from 'src/app/shared/services/util.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { ClassroomService } from '../../services/classroom.service'
import { StudentService } from '../../services/student.service'

@Component({
  selector: 'a13-classroom-creation',
  templateUrl: './classroom-creation.component.html',
  styleUrls: ['./classroom-creation.component.scss']
})
export class ClassroomCreationComponent implements OnInit, OnDestroy {

  classroomFormGroup: FormGroup
  studentList: any[]
  studentIdList: any[]
  srcImage: any
  classroom: any

  queryClassroomName: any
  observableClassroomName: any
  validatingName: boolean

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private classroomService: ClassroomService,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<ClassroomCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.srcImage = UtilService.srcImage
    this.classroom = this.data.entity

    // Init form controls
    this.classroomFormGroup = this.formBuilder.group({
      nameCtrl: [this.classroom.name || '', Validators.required],
      studentListCtrl: [this.studentIdList || []]
    })

    // Listen name changes
    this.onClassroomChange()

    // If edit
    if (this.classroom.id) {
      this.queryStudentsByClassroom()
    }
  }

  onClassroomChange() {
    const nameCtrl = this.classroomFormGroup.controls.nameCtrl

    this.queryClassroomName = nameCtrl.valueChanges
      .subscribe(() => this.validatingName = true)

    this.observableClassroomName = nameCtrl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(() => this.classroomService.queryClassroom(UtilService.capitalize(nameCtrl.value)))
      ).subscribe((result: any) => {
        if (result.length && this.data.entity.name !== result[0].payload.doc.data().name) {
          nameCtrl.setErrors({ nameTaken: true })
        }
        nameCtrl.setErrors(nameCtrl.errors)
        nameCtrl.markAsTouched()
        this.validatingName = false
      })
  }

  async queryStudentsByClassroom(): Promise<any> {
    const students = await this.studentService.queryStudentsByClassroom(this.classroom.id)
    this.studentIdList = students.map((student: any) => student.id)
    this.classroomFormGroup.controls.studentListCtrl.setValue(this.studentIdList)
  }

  formatStudentIdList(): any[] {
    const studentListCtrl = this.classroomFormGroup.value.studentListCtrl
    return studentListCtrl.studentCtrl || studentListCtrl
  }

  async updateStudentClassrooms(): Promise<any> {
    const enrrolledStudents = this.formatStudentIdList()
    const students = await this.studentService.getStudentList()
    const studentsMap = students.map((student: any) => {
      if (enrrolledStudents.includes(student.id)) {
        return this.studentService.addStudentClassroom(student, this.data.entity.id)
      }
      return this.studentService.removeStudentClassroom(student, this.data.entity.id)
    })
    return this.studentService.updateStudentBatch(studentsMap)
  }

  save(): any {
    if (this.classroomFormGroup.valid) {

      const classroom = {
        name: UtilService.capitalize(this.classroomFormGroup.value.nameCtrl || '')
      }

      let setClassroom: any
      if (this.data.entity.id) {
        setClassroom = this.classroomService.updateClassroom(this.data.entity.id, classroom)
      } else {
        setClassroom = this.classroomService.createClassroom(classroom)
      }

      setClassroom
        .then((result: any) => {
          // If edit
          this.classroom.id = result ? result.id : this.classroom.id
          this.updateStudentClassrooms()
          this.dialogRef.close(this.data.entity)
          this.toastService.success(`MSG.CLASSROOM_${result ? 'CREATE' : 'UPDATE'}_OK`)
        })
        .catch((err: any) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        })
    }
  }

  ngOnDestroy(): void {
    this.queryClassroomName.complete()
    this.observableClassroomName.complete()
  }
}
