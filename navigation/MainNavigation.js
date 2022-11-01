import Navbar from '../components/Navbar';
import Interesting from '../pages/Interesting';
import Home from '../pages/Home';
import { createStackNavigator } from '@react-navigation/stack';
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
import Amedia from '../pages/Amedia'
import Megogo from '../pages/Megogo'
import Agreement from '../pages/Agreement'
// import changeNavigationBarColor from 'react-native-navigation-bar-color';


const Stack = createStackNavigator();

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
      <Stack.Navigator  screenOptions={{headerShown:false,gestureResponseDistance:200}}>
          <Stack.Screen  name="Home" component={Home} />
          <Stack.Screen  name="CurrentMovie" component={CurrentMovie} />
          <Stack.Screen  name="Login" component={Authentication} />
          <Stack.Screen  name="TvList" component={TvList} />
          <Stack.Screen  name="Movie" component={MovieNavigation} />
          <Stack.Screen  name="Filter" component={Filter} />
          <Stack.Screen  name="Profile" component={Profile} />
          <Stack.Screen  name="Interesting" component={Interesting} />
          <Stack.Screen  name="Search" component={Search} />
          <Stack.Screen  name="MovieList" component={MovieList} />
          <Stack.Screen  name="ActorResult" component={ActorResult} />
          <Stack.Screen  name="Registration" component={Registration} />
          <Stack.Screen  name="RestoreAbon" component={RestoreAbon} />
          <Stack.Screen  name="Devices" component={Devices} />
          <Stack.Screen  name="PayMethods" component={PayMethods} />
          <Stack.Screen  name="PodpiskaMovie" component={PodpiskaMovie} />
          <Stack.Screen  name="PodpiskaTv" component={PodpiskaTv} />
          <Stack.Screen  name="Answers" component={Answers} />
          <Stack.Screen  name="CurrentTv" component={CurrentTv} />
          <Stack.Screen  name="Amedia" component={Amedia} />
          <Stack.Screen  name="Megogo" component={Megogo} />
          <Stack.Screen  name="Agreement" component={Agreement} />
          
          {/* 
           */}
      </Stack.Navigator>
      {tabBarVisible?<TabBar route={route} changeRoute={changeRoute} ref2={ref2} />:<></>}
    </NavigationContainer>
  );
}


