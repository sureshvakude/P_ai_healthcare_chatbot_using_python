import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ChatInterface } from './components/ChatInterface';
import { AppointmentBooking } from './components/AppointmentBooking';
import { Home } from './components/Home';

type Page = 'home' | 'chat' | 'appointments';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'chat' && <ChatInterface />}
      {currentPage === 'appointments' && <AppointmentBooking />}
    </Layout>
  );
}

export default App;