// import Navbar from '../components/Navbar';
// import Interesting from '../pages/Interesting';
import Home from '../pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Datas } from '../context';
// import TabBar from '../components/TabBar';
// import Search from '../pages/Search';
// import CurrentMovie from '../pages/CurrentMovie';
// import TvList from '../pages/TvList';
// import CurrentTv from '../pages/CurrentChannel';
// import Profile from '../pages/Profile';
// import Authentication from '../pages/Authentication';
// import MovieNavigation from './MoviesNavigation';
// import Filter from '../pages/Filter';
// import MovieList from '../pages/MovieList';
// import ActorResult from '../pages/ActorResult';
// import Registration from '../pages/Registration';
// import RestoreAbon from '../pages/RestoreAbon';
// import Devices from '../pages/Devices';
// import PayMethods from '../pages/PayMethods';
// import PodpiskaMovie from '../pages/PodpiskaMovie';
// import PodpiskaTv from '../pages/PodpiskaTv';
// import Answers from '../pages/Answers';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';


const Stack = createNativeStackNavigator();

export default function Main() {

//   const {tabBarVisible} = useContext(Datas)
//   const ref2 = useRef();
//   const [route,setRoute] = useState({name:'Home'})

//   const changeRoute = (e) => {
//     setRoute(e.routes[e.index])
//   }
  
//   useEffect(() => {
//     const fetch = async() =>{
//       const response = changeNavigationBarColor('#010101')
//     }
//      fetch()
  
//     return () => {
      
//     }
//   }, [])
  

  return (
    <NavigationContainer>
      {/* {tabBarVisible&&ref2.current?<Navbar  ref2={ref2} />:<></>} */}
      <Stack.Navigator  screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home" options={{animationEnabled:false}} component={Home} />
          {/* <Stack.Screen options={{animationEnabled:false}}  name="Movie" component={MovieNavigation} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}}  name="CurrentMovie" component={CurrentMovie} />
          <Stack.Screen options={{animationEnabled:false}}  name="TvList" component={TvList} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}}  name="CurrentTv" component={CurrentTv} />
          <Stack.Screen options={{animationEnabled:false}}  name="Profile" component={Profile} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}}   name="Login" component={Authentication} />
          <Stack.Screen options={{animationEnabled:false}}  name="Interesting" component={Interesting} />
          <Stack.Screen options={{...TransitionPresets.SlideFromRightIOS}}  name="Search" component={Search} />
          <Stack.Screen options={{...TransitionPresets.SlideFromRightIOS}}  name="Filter" component={Filter} />
          <Stack.Screen options={{animationEnabled:false}}  name="ActorResult" component={ActorResult} />
          <Stack.Screen options={{animationEnabled:false}}  name="MovieList" component={MovieList} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}}  name="Registration" component={Registration} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}}  name="RestoreAbon" component={RestoreAbon} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}}  name="Devices" component={Devices} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}}  name="PayMethods" component={PayMethods} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}}  name="PodpiskaMovie" component={PodpiskaMovie} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}} name="PodpiskaTv" component={PodpiskaTv} />
          <Stack.Screen options={{...TransitionPresets.FadeFromBottomAndroid}} name="Answers" component={Answers} /> */}
      </Stack.Navigator>
      {/* {tabBarVisible?<TabBar route={route} changeRoute={changeRoute} ref2={ref2} />:<></>} */}
    </NavigationContainer>
  );
}


