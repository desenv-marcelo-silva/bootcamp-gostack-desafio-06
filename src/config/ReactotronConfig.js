import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron; // Facilita o acesso ao reactotron;

  // sempre que um refresh for feito a timeline
  // do ReactoTron será limpa
  tron.clear();
}
