//CompanyUsers
import CompanyUserList from "./containers/panel/user/CompanyUserList";
import CompanyUserForm from "./containers/panel/user/CompanyUserForm";
//Itinerary
import ItineraryList from "./containers/panel/itinerary/ItineraryList";
import ItineraryForm from "./containers/panel/itinerary/ItineraryForm";
//Home
import HomeList from "./containers/panel/screens/HomeList";
import AboutList from "./containers/panel/screens/AboutList";
import BanerForm from "./containers/panel/screens/BanerForm";
//Leads 
import LeadsList from "./containers/panel/leads/LeadsList";
import LeadsTrankin from "./containers/panel/leads/LeadsTrankin";
import ServicesList from "./containers/panel/screens/ServicesList";
import OurWorkList from "./containers/panel/screens/OurWorkList";
import SectionForm from "./containers/panel/screens/SectionForm";


const routes = [
    //Users
    {
        path: "/panel/users",
        component: CompanyUserList,
    },
    {
        path: "/panel/users_new",
        component: CompanyUserForm,
    },
    {
        path: "/panel/users/:user_id",
        component: CompanyUserForm,
    },
    //servicios
    {
        path: "/panel/:page/lista_servicios",
        component: ItineraryList,
    },
    {
        path: "/panel/:page/nuevo_servicio",
        component: ItineraryForm,
    },
    {
        path: "/panel/:page/:service_id",
        component: ItineraryForm,
    },
    //BANER
    {
        path: "/panel/:page/baner/:baner_id",
        component: BanerForm,
    },
     //SECTION
     {
        path: "/panel/:page/section/:section_id",
        component: SectionForm,
    },
    //INICIO
    {
        path: "/panel/inicio",
        component: HomeList,
    },
    //SOBRE NOSOTROS
    {
        path: "/panel/sobre_nosotros",
        component: AboutList,
    },
    //SERVICIOS
    {
        path: "/panel/servicios",
        component: ServicesList,
    },
    //NUESTRO TRABAJO
    {
        path: "/panel/nuestro_trabajo",
        component: OurWorkList,
    },
    
    //LEADS
    {
        path: "/panel/leads",
        component: LeadsList,
    },
    {
        path: "/panel/leads/:lead_id",
        component: LeadsTrankin,
    },
    
];

export default routes;
