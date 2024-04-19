import ProtectedRoutesLayout from "../layout/ProtectedRoutesLayout";
import HomeLayout from "../layout/HomeLayout";
import LoginLayout from "../layout/LoginLayout";
import LoginPage from "../pages/login/LoginPage";
import Employees from "../pages/employees/Employees";
import Dashboard from "../pages/dashboard/Dashboard";
import Packages from "../pages/packages/Packages";
import Companies from "../pages/companies/Companies";
import Departments from "../pages/departments/Departments";
import ShowDetails from "../pages/employees/showDetails";
import Skills from "../pages/skills/Skills";
import NotFoundPage from "../layout/NotFoundPage";
import Locations from "../pages/locations/Locations";
import Cities from "../pages/locations/cities/cities";
import Categories from "../pages/categories/categories";
import SubCategory from "../pages/sub-category/SubCategory";
import Subscriptions from "../pages/subscriptions/Subscriptions";
import ShowSubscriptionDetails from "../pages/subscriptions/ShowDetails";
import CVS from "../pages/cvs/CVS";
import CompanyDetails from "../pages/companies/showDetails/CompanyDetails";
import JobDetails from "../pages/companies/job/JobDetails";
import Questions from "../pages/questions/Questions";
import AIQuestions from "../pages/ai-questions/AIQuestions";
import Profile from "../pages/profile/Profile";
import Admins from "../pages/admins/Admins";
import Settings from "../pages/settings/Settings";
import AssignCvToJob from "../pages/assign-cv-to-job/AssignCvToJob";
import PermissionAccessLayout from "../layout/PermissionAccessLayout";

export const routes = [
  {
    path: "",
    element: (
      <ProtectedRoutesLayout>
        <HomeLayout />
      </ProtectedRoutesLayout>
    ),
    children: [
      { path: "*", element: <NotFoundPage /> },
      {
        path: "/",
        element: (
          <PermissionAccessLayout permissionAllowed={1} pageName={"home"}>
            <Dashboard />
          </PermissionAccessLayout>
        ),
      },
      { path: "/profile", element: <Profile /> },
      { path: "/employees", element: <Employees /> },
      { path: "/employees/:id", element: <ShowDetails /> },
      {
        path: "/packages",
        element: (
          <PermissionAccessLayout permissionAllowed={1} pageName={"packages"}>
            <Packages />
          </PermissionAccessLayout>
        ),
      },
      { path: "/companies", element: <Companies /> },
      { path: "/companies/:id", element: <CompanyDetails /> },
      { path: "/companies/jobs/:id", element: <JobDetails /> },

      {
        path: "/skills",
        element: (
          <PermissionAccessLayout permissionAllowed={1} pageName={"skills"}>
            <Skills />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/locations",
        element: (
          <PermissionAccessLayout permissionAllowed={1} pageName={"locations"}>
            <Locations />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/locations/:parentId",
        element: (
          <PermissionAccessLayout permissionAllowed={1} pageName={"cities"}>
            <Cities />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/categories",
        element: (
          <PermissionAccessLayout permissionAllowed={1} pageName={"categories"}>
            <Categories />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/sub-category/:parentId",
        element: (
          <PermissionAccessLayout
            permissionAllowed={1}
            pageName={"sub-category"}
          >
            <SubCategory />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/departments/:parentId",
        element: (
          <PermissionAccessLayout
            permissionAllowed={1}
            pageName={"departments"}
          >
            <Departments />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/subscriptions",
        element: (
          <PermissionAccessLayout
            permissionAllowed={1}
            pageName={"subscriptions"}
          >
            <Subscriptions />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/subscriptions/:id",
        element: (
          <PermissionAccessLayout
            permissionAllowed={1}
            pageName={"subscriptions"}
          >
            <ShowSubscriptionDetails />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/questions/:id",
        element: (
          <PermissionAccessLayout permissionAllowed={1} pageName={"questions"}>
            <Questions />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/ai-questions/:id",
        element: (
          <PermissionAccessLayout
            permissionAllowed={1}
            pageName={"ai_questions"}
          >
            <AIQuestions />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/cvs",
        element: (
          <PermissionAccessLayout >
            <CVS />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/admins",
        element: (
          <PermissionAccessLayout permissionAllowed={1} pageName={"admins"}>
            <Admins />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/assign-cv-to-job/:id",
        element: (
          <PermissionAccessLayout
            permissionAllowed={1}
            pageName={"assign_cv_to_job"}
          >
            <AssignCvToJob />
          </PermissionAccessLayout>
        ),
      },
      {
        path: "/settings",
        element: (
          <PermissionAccessLayout
            permissionAllowed={1}
            pageName={"departments"}
          >
            <Settings />
          </PermissionAccessLayout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
];
