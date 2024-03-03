import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ClientListing from "./pages/Admin/clientListing";
import StaffListing from "./pages/Admin/staffListing";

import SendReward from './pages/Admin/SendReward'
import EditStaff from "./pages/Admin/editStaff";
import EditProject from "./pages/Admin/EditProject";
import CreateProject from "./pages/Admin/CreateProject";
import AddStaff from "./pages/Admin/addStaff";
import Projects from "./pages/Admin/Project";
import EditClient from "./pages/Admin/editClient";
import AddClient from "./pages/Admin/addClient";
import CreateEmail from "./pages/Admin/createEmail";
import Admin from "./pages/Admin/admin";
import Staff from "./pages/staff";
import ProjectTeam from "./pages/projectTeam";
import Client from "./pages/client";

function App() {
  const queryClient = new QueryClient();

  return (
    
      <QueryClientProvider client={queryClient}>
      
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/dashboard/admin/" element={<Admin />}>
            <Route path="staffs" element={<StaffListing />} />
            <Route path="staffs/edit/:id" element={<EditStaff />} />
            <Route path="staffs/addstaff" element={<AddStaff />} />

            <Route path="clients" element={<ClientListing />} />
            <Route path="clients/edit/:id" element={<EditClient />} />
            <Route path="clients/addclient" element={<AddClient />} />

            <Route path="createemail" element={<CreateEmail />} />
            <Route path="sendreward" element={<SendReward />} />

            <Route path="projects" element={<Projects />} />
            <Route path="projects/editproject/:id" element={<EditProject />} />
            <Route path="projects/createproject" element={<CreateProject />} />
          </Route>

          <Route path="/dashboard/staff" element={<Staff />} />
          <Route path="/dashboard/projectteam" element={<ProjectTeam />} />
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
