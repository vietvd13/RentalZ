import { 
  IonBackButton, 
  IonButton, 
  IonButtons, 
  IonContent, 
  IonDatetime, 
  IonHeader, 
  IonIcon, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonPage, 
  IonRadio, 
  IonRadioGroup, 
  IonSelect, 
  IonSelectOption, 
  IonTitle, 
  IonToolbar, 
  useIonToast 
} from '@ionic/react';
import { addCircle, trashSharp } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { 
  getStudentById, 
  deleteStudent, 
  updateStudent 
} from '../databaseHandler';
import { Student } from '../student';

interface MyParams {
  id: string
};

const Details: React.FC = () => {
  const { id } = useParams<MyParams>()

  const [name, setName] = useState<string>('')
  const [country, setCountry] = useState('')
  const [languages, setLangages] = useState<string[]>([]);
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString());
  const [gender, setGender] = useState('')

  const [present, dismiss] = useIonToast();
  const history = useHistory();

  const handleUpdate = () => {
    const idStudent = (Number.parseInt(id));

    const newStudent = {
      name: name, 
      country: country,
      languages: languages, 
      dateOfBirth: dateOfBirth, 
      gender: gender
    };

    updateStudent(newStudent, idStudent);

    alert("Update done!")
  }
  function handleDelete() {
    const userConfirm = window.confirm("Are you sure to delete ?");

    if (userConfirm) {
      deleteStudent(Number.parseInt(id));

      alert('deleteion done!');
      history.goBack();
    } else {
      alert("You cancelled!");
    }
  }
  async function fetchData() {
    const student = await getStudentById(Number.parseInt(id)) as Student;

    setName(student.name);
    setCountry(student.country);
    setDateOfBirth(student.dateOfBirth);
    setLangages(student.languages);
    setGender(student.gender);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle color="warning">Details {name}</IonTitle>
          <IonButton onClick={handleDelete} size="small" color="danger" slot="end">
            <IonIcon slot="icon-only" icon={trashSharp}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput value={name} onIonChange={event => setName(event.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Country</IonLabel>
          <IonSelect value={country} onIonChange={event => setCountry(event.detail.value)}>
            <IonSelectOption value="Vietnam">Vietnam</IonSelectOption>
            <IonSelectOption value="Lao">Lao</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Languages can speak</IonLabel>
          <IonSelect value={languages} multiple={true} onIonChange={e => setLangages(e.detail.value)}>
            <IonSelectOption value="Vietnamese">Vietnamese</IonSelectOption>
            <IonSelectOption value="Lao">Lao</IonSelectOption>
            <IonSelectOption value="English">English</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Date of birth</IonLabel>
          <IonDatetime onIonChange={e => setDateOfBirth(e.detail.value!)} value={dateOfBirth}></IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Gender</IonLabel>
          <IonRadioGroup value={gender} onIonChange={e => setGender(e.detail.value)}>
            <IonItem>
              <IonLabel><small>Male</small></IonLabel>
              <IonRadio value="Male"></IonRadio>
            </IonItem>
            <IonItem lines="none">
              <IonLabel><small>Female</small></IonLabel>
              <IonRadio value="Female"></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonItem>

        <IonButton color="warning" expand="block" onClick={handleUpdate} >
          <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Details;