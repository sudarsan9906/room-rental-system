import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ClientListing from "./pages/Admin/clientListing";

import EditProject from "./pages/Admin/EditProject";
import CreateProject from "./pages/Admin/CreateProject";

import Projects from "./pages/Admin/Project";
import EditClient from "./pages/Admin/editClient";
import AddClient from "./pages/Admin/addClient";

import Admin from "./pages/Admin/admin";

import Client from "./pages/Client/client";

function App() {
  const queryClient = new QueryClient();

  return (
    
      <QueryClientProvider client={queryClient}>
      
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/dashboard/admin/" element={<Admin />}>

            <Route path="clients" element={<ClientListing />} />
            <Route path="clients/edit/:id" element={<EditClient />} />
            <Route path="clients/addclient" element={<AddClient />} />

            <Route path="projects" element={<Projects />} />
            <Route path="projects/editproject/:id" element={<EditProject />} />
            <Route path="projects/createproject" element={<CreateProject />} />
          </Route>

          <Route path="/dashboard/client" element={<Client />} />
          <Route
            path="*"
            element={
              <>
                <h1 className="text-white">Page Not found!</h1>
              </>
            }
          />
        </Routes>
      </QueryClientProvider>
    
  );
}

export default App;
