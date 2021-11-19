import React from 'react';
import UserStore from './stores/UserStore';
import { observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LoginForm from './pages/Login';
// import LoginForm from './pages/Login';
import SubmitButton from './SubmitButton';
import './App.css';
import KPI from './pages/kpi/KPI';
import PMOInput from './pages/pmoinput';
//import KPI from './KPI';
import PMInput from './pages/pmInput';
import PMKPI from './pages/kpi/PMKPI'
import Home from './pages/home/home';
import Navbar from './Components/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import MenuAppBar from './Components/AppBar';
import projectStore from './stores/ProjectStore';
//import ProjectHome from './pages/projects/ProjectHome';



class App extends React.Component {


  async componentDidMount() {

    try {

      UserStore.loading = false;

     let res = await fetch(`http://20.84.70.197:5000/isLoggedIn`, {

        method: 'get',

        headers: {

          'Accept': 'application/json',

          'Content-Type': 'application/json'

        }

      });

      let result = await res.json();

      if (result) {

        UserStore.loading = false;

      

        if(sessionStorage.getItem('isLogOut')===true){

          sessionStorage.setItem('isLoggedIn', 'false');

       

        }else{

          sessionStorage.setItem('isLoggedIn', 'true');

          sessionStorage.setItem('isLogOut', 'false');

         

        }




      }

      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;

      }
    }
    catch (e) {
      console.log('eeexception');
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      alert("logout")
      let res = await fetch('http://20.84.70.197:5000/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }

    }
    catch (e) {
      console.log(e);
      console.log('eeexception');
      alert(e+"...");

    }
  }


  render() {

    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">
            Loading, please wait..
            </div>
        </div>
      );
    }
    else {
    // alert(UserStore.username +"else"+UserStore.isLoggedIn+"..."+sessionStorage.getItem('isLoggedIn')+".."+sessionStorage.getItem('username'));
    if (sessionStorage.getItem('isLoggedIn')!==true || UserStore.isLoggedIn) {
     if (UserStore.username || (sessionStorage.getItem('username')!==null && sessionStorage.getItem('username')!=='undefined'))
     {
          return (
           // <KPI data={[UserStore.username,1]}></KPI>
            <>
            <MenuAppBar/>
            <Grid position="fixed" styel={{color:"red"}}>PMO Audit Tool</Grid> 
              <Router>
                <Grid container spacing={3} >
                  <Grid item sm={1}>
                    <Navbar projectStore={projectStore} />
                    {/* <div justi>PMO Audit Tool</div> */}
                  </Grid>
                  <Grid  item sm={11}>
                    <Switch>
                      <Route path='/' exact={true} component={Home} />
                      <Route path='/pmInput' exact={true} render={(props) => (<PMInput data={projectStore.id} />)} />
                      <Route path='/pmoInput' exact={true} render={(props) => (<PMOInput data={projectStore.id} />)} />
                      <Route path='/KPI/PM' exact={true} render={(props) => (
                                            <PMKPI data={[sessionStorage.getItem('username'),projectStore.id]}/>)} />
                    {/*   <Route path='/KPI/SA' render={(props) => (
                                <KPI data={[sessionStorage.getItem('username'),projectStore.id]}/>)} />
                                
                    <Route path='/projects' exact={true} component={ProjectList}/> */}
                    </Switch>
                  </Grid>

                </Grid>
              </Router>
            </>

            // <div className="app">
            //   {/* <PMInput /> */}

            //   <Home/>
            //   <div className="containerTable">
            //     {/* <LoginForm/> */}

            //  <KPI></KPI>
            //     {/* <Tables data={UserStore.username}></Tables> */}
            //   </div>
            // </div>
            // <div className="app">
            //   <div className ="container">
            //     Welcome {UserStore.username}
            //     <SubmitButton text={'Log Out'} disabled ={false}
            //     onClick ={()=>this.doLogout()}/>
            //     </div>
            //     </div>
          );
        }
      }


      return (
        <div className="app">
          <div className="container">
            <Card>
              <CardContent>
                <LoginForm></LoginForm>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  }


}

export default observer(App);
