import PageNotFound from 'components/error_page/404';
import Loader from 'components/loader';
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const SignIn = lazy(() => import('pages/signin'));
const SignUp = lazy(() => import('pages/signup'));
const HomePage = lazy(() => import('pages/home'));

const EventList = lazy(() => import('pages/dashboard/event-list'));
const CreateEventPage = lazy(() => import('pages/dashboard/event-create'));
const EventPage = lazy(() => import('pages/events/event'));


const MyRoute = () => {
  return (
    <Suspense fallback={<Loader />}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path='/dashboard/events' element={<EventList />} />
        <Route path='/dashboard/events/create' element={<CreateEventPage />} />

        <Route path='/events/:id' element={<EventPage />} />

        <Route path='/lorem' element={<PageNotFound />} />

      </Routes>
    </Suspense>
  );
}

export default MyRoute;
