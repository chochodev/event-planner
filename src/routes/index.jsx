import PageNotFound from 'components/error_page/404';
import Loader from 'components/loader';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Protected from './PrivateRoute';
import AccessDenied from 'components/error_page/unauthenticated';

const SignIn = lazy(() => import('pages/signin'));
const SignUp = lazy(() => import('pages/signup'));
const VerifyEmail = lazy(() => import('pages/signup/components/verify_email'));
const HomePage = lazy(() => import('pages/home'));

const MyEventList = lazy(() => import('pages/dashboard/event-list'));
const CreateEventPage = lazy(() => import('pages/dashboard/event-create'));
const EventPage = lazy(() => import('pages/events/event'));
const EventList = lazy(() => import('pages/events'));
const Dashboard = lazy(() => import('pages/dashboard'));
const ProfileSetting = lazy(() => import('pages/dashboard/profile'));

const EventGui = lazy(() => import('@/components/event_gui'));

const MyRoute = () => {
  return (
    <Suspense fallback={<Loader />}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/accounts/activate/:token' element={<VerifyEmail />} />


        <Route path='/events' element={<EventList />} />
        <Route path='/events/:id' element={<EventPage />} />

        {/* ::::::::::::::: Protected Routes */}
        <Route element={<Protected />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/events' element={<MyEventList />} />
          <Route path='/dashboard/profile' element={<ProfileSetting />} />
        </Route>

          <Route path='/dashboard/events/create' element={<CreateEventPage />} />
        {/* :::::::::::::::::: Event plan gui */}
        <Route path='/dashboard/event/gui' element={<EventGui />} />

        {/* ::::::::::::::: for undefined paths */}
        <Route path="*" element={<PageNotFound />} />

        {/* ::::::::::::::: for protected routes */}
        <Route path='/unauthenticated' element={<AccessDenied />} />
      </Routes>
    </Suspense>
  );
}

export default MyRoute;
