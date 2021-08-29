import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DashboardPage from "./views/Dashboard/Dashboard2";
import ProfileEnseignant from "./views/ProfileEnseignant/ProfileEnseignant.js";
import Eleves from "./views/Eleves/Eleves";
import Emploi from "./views/Emploi/Emploi"
import Presence from "./views/Presence/Presence"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "احصائيات",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/enseignant",
  },
  {
    path: "/user",
    name: "المعلومات الشخصية",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: ProfileEnseignant,
    layout: "/enseignant",
  },
  {
    path: "/table",
    name: " التصرف في التلاميذ",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Eleves,
    layout: "/enseignant",
  },
  {
    path: "/emloi",
    name: "جدول أوقاتي",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Emploi,
    layout: "/enseignant",
  },
  {
    path: "/Absence",
    name: "الحضور",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Presence,
    layout: "/enseignant",
  },
];

export default dashboardRoutes;
