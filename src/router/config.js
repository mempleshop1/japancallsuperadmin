const routes = [
    {
        path: ["/", "/landing", "/login", "/signup"],
        exact: true,
        component: "Home",
    },
    {
        path: ["/dashboard"],
        exact: true,
        component: "Dashboard",
    },
];

export default routes;
