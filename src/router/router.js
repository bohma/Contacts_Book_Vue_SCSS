import Vue from 'vue'
import Router from 'vue-router'

import ContactsList from "../components/ContactsList";

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            component: ContactsList,
            name: 'home'
        },
        {
            path: "/contact-info/:id",
            name: 'contact-info',
            component: () =>
                import(/* webpackChunkName: "contactsItem" */ "../components/contact-info.vue")
        },
    ]
})

export default router