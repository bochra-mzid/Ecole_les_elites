import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import DashboardPage from "./views/Dashboard/Dashboard1.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import Classes from "./views/Classes/Classes.js";
import Matieres from "./views/Matieres/Matieres.js"
import Affectation from "./views/Affectation/Affectation";
import Prof from "./views/Prof/Prof"
import Calendrier from "./views/Calendrier/Calendrier";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "احصائيات",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "المعلومات الشّخصيّة",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "التصرف في المدرسين",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Prof,
    layout: "/admin",
  },
  {
    path: "/classes",
    name: "التصرف في الأقسام",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Classes,
    layout: "/admin",
  },
  {
    path: "/matieres",
    name: "التّصرّف في المواد",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Matieres,
    layout: "/admin",
  },
  {
    path: "/affectation",
    name: "تعيين المدرّسين",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Affectation,
    layout: "/admin",
  },
  {
    path: "/emploi",
    name: "التصرف في جداول الأوقات",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Calendrier,
    layout: "/admin",
  },
];

export default dashboardRoutes;
