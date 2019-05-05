import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentList: Student[] = [{
    id: 1,
    name: 'Alejandro',
    surname: 'Martín Fernández',
    avatar: '',
    type: 'FEMAE',
    phones: [{
      name: 'Padre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }, {
    id: 2,
    name: 'Carmen',
    surname: 'Valiente Blasco',
    avatar: '',
    type: 'Particular',
    phones: [{
      name: 'Padre',
      number: '654987631'
    }, {
      name: 'Madre',
      number: '654987631'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }, {
    id: 3,
    name: 'María',
    surname: 'Abreu Márquez',
    avatar: '',
    type: 'Particular',
    phones: [{
      name: 'Madre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }, {
    id: 4,
    name: 'Enrique',
    surname: 'Romero Romero',
    avatar: '',
    type: 'FEMAE',
    phones: [{
      name: 'Madre',
      number: '687532145'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }, {
    id: 5,
    name: 'Marco',
    surname: 'Hoya Cordobés',
    avatar: '',
    type: 'Particular',
    phones: [{
      name: 'Padre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }, {
    id: 6,
    name: 'Raquel',
    surname: 'Hoyos',
    avatar: '',
    type: 'FEMAE',
    phones: [{
      name: 'Madre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }, {
    id: 7,
    name: 'Marta',
    surname: '',
    avatar: '',
    type: 'Particular',
    phones: [{
      name: 'Padre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }, {
    id: 8,
    name: 'Diego',
    surname: 'Bravo Rojo',
    avatar: '',
    type: 'FEMAE',
    phones: [{
      name: 'Padre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }, {
    id: 9,
    name: 'Daniel',
    surname: 'Rubio Rebollo',
    avatar: '',
    type: 'FEMAE',
    phones: [{
      name: 'Madre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }, {
    id: 10,
    name: 'Saray',
    surname: 'Brachiller',
    avatar: '',
    type: 'FEMAE',
    phones: [{
      name: 'Padre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }]
  }]

  constructor() {
  }

  getStudentList() {
    return this.studentList
  }
}
