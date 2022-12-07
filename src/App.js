import React from "react";
import {createBrowserHistory} from "history";
import {Router, Switch, Route, useHistory, Redirect} from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import AddPost from "./pages/Post/AddPost";
import Home from "./pages/Home";
import PostPage from "./pages/Post/PostPage";
import Direct from "./pages/Direct/Direct";
import MyNetwork from "./pages/My Network/MyNetwork";
import SearchUser from "./pages/SearchUser";
import Notifications from "./pages/Notifications";
import Navbar from "./myComponents/Navbar";

let hist = createBrowserHistory();

function H() {
    return <React.Fragment>
        <Switch>
            <Route exact path="/">
                <Redirect to="/home"/>
            </Route>
            <Route path={'/login'}
                   render={() => localStorage.getItem('username') ? <Redirect to={'/home'}/> : <LoginPage/>}/>
            <Route path={'/signup'}
                   render={() => localStorage.getItem('username') ? <Redirect to={'/home'}/> : <SignUp/>}/>
            <Route path={'/profile/:username'}
                   render={() => localStorage.getItem('username') ? <React.Fragment> <Navbar/> <ProfilePage/> </React.Fragment> :
                       <Redirect to={'/login'}/>}/>
            <Route path={'/editprofile'}
                   render={() => localStorage.getItem('username') ? <React.Fragment> <Navbar/> <EditProfile/> </React.Fragment> :
                       <Redirect to={'/login'}/>}/>
            <Route path={'/addpost'}
                   render={() => localStorage.getItem('username') ? <React.Fragment> <Navbar/> <AddPost/> </React.Fragment> :
                       <Redirect to={'/login'}/>}/>
            <Route path={'/home'}
                   render={() => localStorage.getItem('username') ? <React.Fragment> <Navbar/> <Home/> </React.Fragment> :
                       <Redirect to={'/login'}/>}/>
            <Route path={'/post/:postId'}
                   render={() => localStorage.getItem('username') ? <React.Fragment> <Navbar/> <PostPage/> </React.Fragment> :
                       <Redirect to={'/login'}/>}/>
            <Route path={'/direct/:archive/:read/:chatId'}
                   render={() => localStorage.getItem('username') ? <React.Fragment> <Navbar/> <Direct/> </React.Fragment> :
                       <Redirect to={'/login'}/>}/>
            <Route path={'/direct'}
                   render={() => localStorage.getItem('username') ? <React.Fragment> <Navbar/> <Direct/> </React.Fragment> :
                       <Redirect to={'/login'}/>}/>
            <Route path={'/mynetwork'}
                   render={() => localStorage.getItem('username') ? <React.Fragment> <Navbar/> <MyNetwork/> </React.Fragment> :
                       <Redirect to={'/login'}/>}/>
            <Route path={'/searchuser'}
                   render={() => localStorage.getItem('username') ? <React.Fragment> <Navbar/> <SearchUser/> </React.Fragment> :
                       <Redirect to={'/login'}/>}/>
            <Route path={'/notifications'}
                   render={() => localStorage.getItem('username') ?
                       <React.Fragment> <Navbar/> <Notifications/> </React.Fragment> : <Redirect to={'/login'}/>}/>
        </Switch>
    </React.Fragment>
}

function App() {


    return (
        <Router history={hist}>
            <H/>
        </Router>
    );
}

export default App;
