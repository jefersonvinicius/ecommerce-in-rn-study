import React, {useEffect, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import {useLogInAction} from '../../modules/auth/login';
import {COLORS} from '../../config/theme';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onLogInFinished: () => void;
};

export default function LogInModal({isVisible, onClose, onLogInFinished}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = useLogInAction();

  useEffect(() => {
    if (!isVisible) {
      setEmail('');
      setPassword('');
    }
  }, [isVisible]);

  function handleLogIn() {
    logIn({email, password})
      .then(() => {
        onLogInFinished();
      })
      .catch(error => {
        Alert.alert('Error on Log In', error.message);
      });
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} onBackButtonPress={onClose}>
      <View style={styles.content}>
        <Text style={styles.title}>Log in to continue</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} />
        <View>
          <View style={styles.logInButtonWrapper}>
            <Pressable
              onPress={handleLogIn}
              style={styles.logInButton}
              android_ripple={{color: 'rgba(0, 0, 0, 0.2)', borderless: true}}>
              <Text style={styles.logInLabel}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    // margin: 50
  },
  logInButtonWrapper: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
  },
  logInButton: {
    padding: 10,
  },
  logInLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    marginTop: 10,
    padding: 10,
  },
});
