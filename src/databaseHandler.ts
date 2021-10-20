import { openDB } from 'idb';
import { Student } from './student';

const DATABASE_NAME = 'RentalZ';

async function initDB() {
  const db = await openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      const store = db.createObjectStore('student', {
        keyPath: 'id',
        autoIncrement: true,
      });
    }
  });
};

initDB().then(() => {
  console.log('Database is ready');
});

export async function insertStudent(student:any) {
  const db = await openDB(DATABASE_NAME, 1);

  await db.put('student', student)
    .then(() => {
      console.log('You have successfully created 1 student: ', student);
    })
    .catch((err) => {
      console.log('You have an error occurred');
      console.log(err);
    });
};

export async function updateStudent(dataUpdateStudent:any, id:number) {
  const db = await openDB(DATABASE_NAME, 1);
  const student = await db.transaction('student').objectStore('student').get(id) as Student
  student.name = dataUpdateStudent.name
  student.gender = dataUpdateStudent.gender
  student.languages = dataUpdateStudent.languages
  student.country = dataUpdateStudent.country
  student.dateOfBirth = dataUpdateStudent.dateOfBirth

  await db.put('student', student)
    .then(() => {
      console.log(`You have successfully updated information for student whose id is ${id}`);
      console.log(student);
    })
    .catch((err) => {
      console.log('You have an error occurred');
      console.log(err);
    });
};

export async function deleteStudent(id:number) {
  const db = await openDB(DATABASE_NAME, 1);

  await db.delete('student', id)
    .then(() => {
      console.log(`You have successfully deleted the student whose id is ${id}`);
    })
    .catch((err) => {
      console.log('You have an error occurred');
      console.log(err);
    });
};

export async function getStudentById(id:number) {
  const db = await openDB(DATABASE_NAME, 1);

  const student = await db.transaction('student').objectStore('student').get(id);

  return student;
};

export async function getAllStudent() {
  const db = await openDB(DATABASE_NAME, 1);

  let student = await db.transaction('student').objectStore('student').openCursor();

  let allStudent = [];

  while (student) {
    allStudent.push(student.value);

    student = await student.continue();
  };

  return allStudent;
}

