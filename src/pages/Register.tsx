import { 
  IonButton, 
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
import { add } from 'ionicons/icons';
import { useState } from 'react';
import { insertStudent } from '../databaseHandler'

const Register: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [country, setCountry] = useState('')
  const [languages, setLangages] = useState<string[]>([]);
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString());
  const [gender, setGender] = useState('')
  
  const [present, dismiss] = useIonToast()

  const registerClick = ()=>{
    const newStudent = {
      name: name,
      country: country,
      languages: languages,
      dateOfBirth: dateOfBirth,
      gender: gender
    };

    insertStudent(newStudent);

    present('Insertion completed!',2000);
  };

  return (
    <IonPage>
      {/* Start Register Page */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register page</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* End Register Page */}

      <IonContent className="ion-padding">
        {/* Start Input Name */}
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput onIonChange={event => setName(event.detail.value!)}></IonInput>
        </IonItem>
        {/* End Input Name */}

        {/* Start Select Country */}
        <IonItem>
          <IonLabel position="stacked">Country</IonLabel>
          <IonSelect onIonChange={event => setCountry(event.detail.value)}>
            <IonSelectOption value="Vietnam">Vietnam</IonSelectOption>
            <IonSelectOption value="English">English</IonSelectOption>
            <IonSelectOption value="Japan">Japan</IonSelectOption>
          </IonSelect>
        </IonItem>
        {/* End Select Country */}

        {/* Start Select Languages can speak */}
        <IonItem>
          <IonLabel position="stacked">Languages can speak</IonLabel>
          <IonSelect multiple={true} onIonChange={e=>setLangages(e.detail.value)}>
            <IonSelectOption value="Vietnamese">Vietnamese</IonSelectOption>
            <IonSelectOption value="English">English</IonSelectOption>
            <IonSelectOption value="Japan">Japan</IonSelectOption>
          </IonSelect>
        </IonItem>
        {/* End Select Languages can speak */}

        {/* Start Input Data of birth */}
        <IonItem>
          <IonLabel position="stacked">Date of birth</IonLabel>
          <IonDatetime onIonChange={e=>setDateOfBirth(e.detail.value!)} value={dateOfBirth}></IonDatetime>
        </IonItem>
        {/* End Input Data of birth */}

        {/* Start Radio Gender */}
        <IonItem>
          <IonLabel position="stacked">Gender</IonLabel>
          <IonRadioGroup onIonChange={e=>setGender(e.detail.value)}>
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
        {/* End Radio Gender */}

        {/* Start Button Submit */}
        <IonButton expand="block" onClick={registerClick}>
          <IonIcon 
            slot="icon-only" 
            icon={add}
          ></IonIcon>
          Submit
        </IonButton>
        {/* End Button Submit */}

      </IonContent>
    </IonPage>
  );
};

export default Register;