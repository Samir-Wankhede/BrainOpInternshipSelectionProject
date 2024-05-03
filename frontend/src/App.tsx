import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Loader from './common/Loader/Loader';
import PageTitle from './components/PageTitle';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Posts from './pages/Posts';
import ChangePassword from './pages/ChangePassword';

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const { pathname } = useLocation();
    const {user} = useAuthContext();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
      setTimeout(() => setLoading(false), 1000);
    }, []);
    //Setting Up Routes and Loader
    return loading ? 
    (
      <div className="flex h-screen items-center justify-center bg-[#111]">
       <Loader /> 
      </div>
      
    ) : (
      <>
      <Routes>
        {<Route
          index
          element={
            !user?
            <>
              <PageTitle title="Signup | PostApp" />
              <SignUp/>
            </>
            :
            <>
             <Navigate to={"/posts"} />
            </>
          }
        />
        }{
        <Route
          path='/signin'
          element={
            !user?
            <>
              <PageTitle title="Signin | PostApp" />
              <SignIn/>
            </>
            :
            <>
             <Navigate to={"/posts"} />
            </>
          }
        />}
        {<Route
          path='/posts'
          element={user?
            <>
              <PageTitle title="Posts | PostApp" />
              <Posts/>
            </>:
            <>
            <Navigate to={"/"} />
            </>
          }
        />}
        <Route 
          path='/changepassword'
          element={
            <>
              <PageTitle title='Change Password | PostApp'/>
              <ChangePassword/>
            </>
          }
        />
      </Routes>
      </> 
  );
}

export default App;
