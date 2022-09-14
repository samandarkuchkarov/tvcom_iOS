import Navbar from '../components/Navbar';
import Interesting from '../pages/Interesting';
import Home from '../pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  React, {useContext,useRef,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Datas } from '../context';
import TabBar from '../components/TabBar';
import Search from '../pages/Search';
import CurrentMovie from '../pages/CurrentMovie';
import TvList from '../pages/TvList';
import CurrentTv from '../pages/CurrentChannel';
import Profile from '../pages/Profile';
import Authentication from '../pages/Authentication';
import { StatusBar } from 'expo-status-bar';
import MovieNavigation from './MoviesNavigation';
import Filter from '../pages/Filter';
import MovieList from '../pages/MovieList';
import ActorResult from '../pages/ActorResult';
import Registration from '../pages/Registration';
import RestoreAbon from '../pages/RestoreAbon';
import Devices from '../pages/Devices';
import PayMethods from '../pages/PayMethods';
import PodpiskaMovie from '../pages/PodpiskaMovie';
import PodpiskaTv from '../pages/PodpiskaTv';
import Answers from '../pages/Answers';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';


const Stack = createNativeStackNavigator();

export default function Main() {

  const {tabBarVisible} = useContext(Datas)
  const ref2 = useRef();
  const [route,setRoute] = useState({name:'Home'})

  const changeRoute = (e) => {
    setRoute(e.routes[e.index])
    
  }
  

  return (
    <NavigationContainer onStateChange={changeRoute} ref={ref2}>
      {tabBarVisible&&ref2.current?<Navbar  ref2={ref2} />:<></>}
      <Stack.Navigator  screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home" options={{animationEnabled:false}} component={Home} />
          <Stack.Screen options={{animationEnabled:false}}  name="CurrentMovie" component={CurrentMovie} />
          <Stack.Screen options={{animationEnabled:false}}   name="Login" component={Authentication} />
          <Stack.Screen options={{animationEnabled:false}}  name="TvList" component={TvList} />
          <Stack.Screen options={{animationEnabled:false}}  name="Movie" component={MovieNavigation} />
          <Stack.Screen options={{animationEnabled:false}}  name="Filter" component={Filter} />
          <Stack.Screen options={{animationEnabled:false}}  name="Profile" component={Profile} />
          <Stack.Screen options={{animationEnabled:false}}  name="Interesting" component={Interesting} />
          <Stack.Screen options={{animationEnabled:false}}  name="Search" component={Search} />
          <Stack.Screen options={{animationEnabled:false}}  name="MovieList" component={MovieList} />
          <Stack.Screen options={{animationEnabled:false}}  name="ActorResult" component={ActorResult} />
          <Stack.Screen options={{animationEnabled:false}}  name="Registration" component={Registration} />
          <Stack.Screen options={{animationEnabled:false}}  name="RestoreAbon" component={RestoreAbon} />
          <Stack.Screen options={{animationEnabled:false}}  name="Devices" component={Devices} />
          <Stack.Screen options={{animationEnabled:false}}  name="PayMethods" component={PayMethods} />
          <Stack.Screen options={{animationEnabled:false}}  name="PodpiskaMovie" component={PodpiskaMovie} />
          <Stack.Screen options={{animationEnabled:false}}  name="PodpiskaTv" component={PodpiskaTv} />
          <Stack.Screen options={{animationEnabled:false}}  name="Answers" component={Answers} />
          <Stack.Screen options={{animationEnabled:false}}  name="CurrentTv" component={CurrentTv} />
          {/* 
           */}
      </Stack.Navigator>
      {tabBarVisible?<TabBar route={route} changeRoute={changeRoute} ref2={ref2} />:<></>}
    </NavigationContainer>
  );
}


