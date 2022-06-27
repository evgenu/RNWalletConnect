import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import * as React from 'react';
import { Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const App: React.FC = () => {
  const connector = useWalletConnect();
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.fullHeight}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{ ...styles.container, ...styles.fullHeight }}>
          {connector.connected ? (
            <>
              {connector.accounts.map((account) => (
                <Text key={account}>Account connected: {account}</Text>
              ))}
              <View style={styles.button}>
                <Button title="Kill Session" onPress={() => connector.killSession()} />
              </View>
            </>
          ) : (
            <View style={styles.button}>
              <Button title="Connect" onPress={() => connector.connect()} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullHeight: {
    height: '100%',
    padding: 8,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    marginTop: 8,
  },
});

export default withWalletConnect(App, {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : 'yourappscheme://',
  storageOptions: {
    asyncStorage: AsyncStorage as any,
  },
});
