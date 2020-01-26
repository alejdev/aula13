import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

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
export class ClassroomCreationComponent implements OnInit {

  classroomFormGroup: FormGroup
  studentList: any[]
  srcImage: any
  classroom: any

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
      studentListCtrl: [this.classroom.students || []]
    })
  }

  getStudentIdList(): any {
    const studentListCtrl = this.classroomFormGroup.value.studentListCtrl
    if (studentListCtrl.hasOwnProperty('studentCtrl')) {
      return studentListCtrl.studentCtrl
    }
    return studentListCtrl
  }

  save(): void {
    if (this.classroomFormGroup.valid) {
      const classroom = {
        name: UtilService.capitalize(this.classroomFormGroup.value.nameCtrl || ''),
        students: this.getStudentIdList()
      }
      let createClassroom: any
      if (this.data.idEntity) {
        createClassroom = this.classroomService.updateClassroom(this.data.idEntity, classroom)
      } else {
        createClassroom = this.classroomService.createClassroom(classroom)
      }
      createClassroom
        .then((result: any) => {
          this.toastService.success(`MSG.CLASSROOM_${this.data.idEntity ? 'UPDATE' : 'CREATE'}_OK`)
          this.dialogRef.close(this.data.entity)
        })
        .catch((err: any) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        })
    }
  }
}
