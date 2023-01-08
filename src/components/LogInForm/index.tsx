import React, {useState} from 'react';
import {useLogInAction} from 'app/modules/auth/login';
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from 'app/config/theme';

type Props = {
  onLogInFinished?: () => void;
};

export default function LogInForm({onLogInFinished}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = useLogInAction();

  function handleLogIn() {
    logIn({email, password})
      .then(() => {
        onLogInFinished?.();
      })
      .catch((error: any) => {
        Alert.alert('Error on Log In', error.message);
      });
  }

  return (
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
    width: '100%',
    height: '100%',
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
