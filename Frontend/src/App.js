import { Redirect, Route, Switch } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Layout from "./components/layout";
import "./App.css";
import Login from "./pages/login";
import ForgetPassword from "./pages/forgetPassword";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/resetPassword";
import Users from "./pages/admin/users/users";
import EditUser from "./pages/admin/users/editUser";
import AddUser from "./pages/admin/users/addUser";
import Category from "./pages/admin/category/categories";
import AdminCategoryView from "./pages/admin/category/viewCategory";
import Editcategory from "./pages/admin/category/editCategory";
import Addcategory from "./pages/admin/category/addCategory";
import AdminAthletes from "./pages/admin/athlete/athletes";
import AdminAthletesAdd from "./pages/admin/athlete/addathlete";
import AdminAthletesEdit from "./pages/admin/athlete/editAthlete";
import AdminAthletesView from "./pages/admin/athlete/viewAthlete";
import AdminDrills from "./pages/admin/drills/drills";
import AdminDrillsAdd from "./pages/admin/drills/adddrill";
import AdminDrillsEdit from "./pages/admin/drills/editdrill";
import AdminDrillsView from "./pages/admin/drills/viewdrill";
import AdminVideos from "./pages/admin/videos/videos";
import AdminVideosAdd from "./pages/admin/videos/addvideo";
import AdminVideosEdit from "./pages/admin/videos/editvideo";
import AdminVideoView from "./pages/admin/videos/viewvideo";
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        {!authCtx.isLoggedIn ? (
          <div>
            <Route path="/" exact>
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/forgetpassword">
              <ForgetPassword />
            </Route>
            <Route path="/resetpassword/:token">
              <ResetPassword />
            </Route>
            {/* <Route path="*">
              <Redirect to="/login" />
            </Route> */}
          </div>
        ) : (
          <div>
            <Route path="/" exact>
              <Category />
            </Route>
            <Route path="/users" exact>
              <Users />
            </Route>
            <Route path="/add-user" exact>
              <AddUser />
            </Route>
            <Route path="/users/:userId">
              <EditUser />
            </Route>
            <Route path="/category" exact>
              <Category />
            </Route>
            <Route path="/addcategory" exact>
              <Addcategory />
            </Route>
            <Route path="/category/:categoryId">
              <Editcategory />
            </Route>
            <Route path="/viewcategory/:categoryId">
              <AdminCategoryView />
            </Route>

            <Route path="/athletes" exact>
              <AdminAthletes />
            </Route>
            <Route path="/addathlete" exact>
              <AdminAthletesAdd />
            </Route>
            <Route path="/athletes/:athleteId" exact>
              <AdminAthletesEdit />
            </Route>
            <Route path="/viewathletes/:athleteId" exact>
              <AdminAthletesView />
            </Route>

            <Route path="/drills" exact>
              <AdminDrills />
            </Route>
            <Route path="/add-drill" exact>
              <AdminDrillsAdd />
            </Route>
            <Route path="/drills/:drillId" exact>
              <AdminDrillsEdit />
            </Route>
            <Route path="/viewdrill/:drillId" exact>
              <AdminDrillsView />
            </Route>
            <Route path="/video" exact>
              <AdminVideos />
            </Route>
            <Route path="/addvideo" exact>
              <AdminVideosAdd />
            </Route>
            <Route path="/video/:videoId" exact>
              <AdminVideosEdit />
            </Route>
            <Route path="/viewvideo/:videoId" exact>
              <AdminVideoView />
            </Route>
            <Route path="*">
              <Redirect to="/category" />
            </Route>
          </div>
        )}
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Layout>
  );
}
export default App;
