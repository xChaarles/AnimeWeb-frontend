import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'WebAnime',
        loadComponent: () => import("./web-anime/WebAnime.component"),
        children:[
            {
                path: 'animes',
                title: 'Animes',
                loadComponent: () => import("./web-anime/animes/animes.component")
            },
            {
                path: 'generos',
                title: 'Generos',
                loadComponent: () => import("./web-anime/genero/genero.component")
            },
            {
                path: 'login',
                title: 'Login',
                loadComponent: () => import("./web-anime/login/login.component")
            },
            {
                path: 'registro',
                title: 'Registro',
                loadComponent: () => import("./web-anime/registro/registro.component")
            },
            {
                path: 'perfil',
                title: 'Perfil',
                loadComponent: () => import("./web-anime/perfil/perfil.component"),
                children:[
                    {
                        path: 'userlist',
                        title: 'Lista Usuarios',
                        loadComponent: () => import("./web-anime/perfil/userlist/userlist.component")
                    },
                    {
                        path: 'userlist',
                        title: 'Lista Usuarios',
                        loadComponent: () => import("./web-anime/perfil/anime-list/anime-list.component")
                    },
                    {
                        path: 'userlist',
                        title: 'Lista Usuarios',
                        loadComponent: () => import("./web-anime/perfil/genero-list/genero-list.component")
                    },
                    {
                        path: 'userlist',
                        title: 'Lista Usuarios',
                        loadComponent: () => import("./web-anime/perfil/update-user/update-user.component")
                    },
                    {
                        path: 'userlist',
                        title: 'Lista Usuarios',
                        loadComponent: () => import("./web-anime/perfil/update-genero/update-genero.component")
                    },
                    {
                        path: 'userlist',
                        title: 'Lista Usuarios',
                        loadComponent: () => import("./web-anime/perfil/update-anime/update-anime.component")
                    },
                    {
                        path: 'userlist',
                        title: 'Lista Usuarios',
                        loadComponent: () => import("./web-anime/perfil/update-anime/update-anime.component")
                    },
                ]
            },
            {
                path:'',
                redirectTo:'WebAnime',
                pathMatch:'full'
            }
        ]    
    },
    {
        path: '',
        redirectTo: '/WebAnime',
        pathMatch: 'full'
    }


];
