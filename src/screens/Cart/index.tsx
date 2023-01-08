import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LogInModal from 'app/components/LogInModal';
import {useAuth, useIsAuthenticated} from 'app/modules/auth';
import {useCartQuery} from 'app/modules/cart';
import {brl} from 'app/utils/currency';
import LogInForm from 'app/components/LogInForm';

export default function CartScreen() {
  const [auth] = useAuth();
  const {isAuthenticated} = useIsAuthenticated();
  const {cart} = useCartQuery();
  const [isVisibleLogIn, setIsVisibleLogIn] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Text>CART</Text>
        {isAuthenticated ? (
          <>
            <View>
              <Text>Logged in as: {auth?.user.name}</Text>
            </View>
            {cart && (
              <>
                {cart.items.map(item => (
                  <Text key={item.id}>
                    {item.name} x{item.quantity}
                  </Text>
                ))}
                <Text>TOTAL: {brl(cart?.total)}</Text>
              </>
            )}
          </>
        ) : (
          <View style={styles.containerCenter}>
            <LogInForm />
          </View>
        )}
      </View>
      <LogInModal
        isVisible={isVisibleLogIn}
        onClose={() => setIsVisibleLogIn(false)}
        onLogInFinished={() => setIsVisibleLogIn(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
