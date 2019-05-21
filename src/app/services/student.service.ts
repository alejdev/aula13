import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _studentList: Student[] = [{
    id: 1,
    name: 'Alejandro',
    surname: 'Martín Fernández',
    fullName: 'Alejandro Martín Fernández',
    avatar: '',
    tag: 'Femae',
    phones: [{
      name: 'Padre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Chelo'
    }, {
      id: 2,
      name: 'Lenguaje'
    }]
  }, {
    id: 2,
    name: 'Carmen',
    surname: 'Valiente Blasco',
    fullName: 'Carmen Valiente Blasco',
    avatar: '',
    tag: 'Particular',
    phones: [{
      name: 'Padre',
      number: '654987631'
    }, {
      name: 'Madre',
      number: '654987631'
    }],
    subjects: [{
      id: 1,
      name: 'Lenguaje'
    }, {
      id: 2,
      name: 'Chelo'
    }, {
      id: 3,
      name: 'Violín'
    }]
  }, {
    id: 3,
    name: 'María',
    surname: 'Abreu Márquez',
    fullName: 'María Abreu Márquez',
    avatar: '',
    tag: 'Particular',
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
    fullName: 'Enrique Romero Romero',
    avatar: '',
    tag: 'Femae',
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
    fullName: 'Marco Hoya Cordobés',
    avatar: '',
    tag: 'Particular',
    phones: [{
      name: 'Padre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Lenguaje'
    }]
  }, {
    id: 6,
    name: 'Raquel',
    surname: 'Hoyos',
    fullName: 'Raquel Hoyos',
    avatar: '',
    tag: 'Femae',
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
    fullName: 'Marta',
    avatar: '',
    tag: 'Particular',
    phones: [{
      name: 'Padre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Lenguaje'
    }]
  }, {
    id: 8,
    name: 'Diego',
    surname: 'Bravo Rojo',
    fullName: 'Diego Bravo Rojo',
    avatar: '',
    tag: 'Femae',
    phones: [{
      name: 'Padre',
      number: '654789321'
    }],
    subjects: [{
      id: 1,
      name: 'Lenguaje'
    }]
  }, {
    id: 9,
    name: 'Daniel',
    surname: 'Rubio Rebollo',
    fullName: 'Daniel Rubio Rebollo',
    avatar: '',
    tag: 'Femae',
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
    surname: 'Bachiller',
    fullName: 'Saray Bachiller',
    avatar: '',
    tag: 'Femae',
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

  get studentList(): Student[] {
    return this._studentList
  }
}
