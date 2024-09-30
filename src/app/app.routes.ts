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
                        path: 'tablas',
                        title: 'Tablas',
                        loadComponent: () => import("./web-anime/perfil/tablas/tablas.component"),
                        children:[
                            {
                                path: 'userlist',
                                title: 'Lista Usuarios',
                                loadComponent: () => import("./web-anime/perfil/tablas/userlist/userlist.component")
                            },
                            {
                                path: 'anime-list',
                                title: 'Lista Animes',
                                loadComponent: () => import("./web-anime/perfil/tablas/anime-list/anime-list.component")
                            },
                            {
                                path: 'genero-list',
                                title: 'Lista Generos',
                                loadComponent: () => import("./web-anime/perfil/tablas/genero-list/genero-list.component")
                            }
                        ]
                    },
                    {
                        path: 'forms',
                        title: 'Forms',
                        loadComponent: () => import("./web-anime/perfil/forms/forms.component"),
                        children:[
                            {
                                path: 'update-user/:uid',
                                title: 'Update User',
                                loadComponent: () => import("./web-anime/perfil/forms/update-user/update-user.component")
                            },
                            {
                                path: 'update-genero/:gid',
                                title: 'Update Genero',
                                loadComponent: () => import("./web-anime/perfil/forms/update-genero/update-genero.component")
                            },
                            {
                                path: 'update-anime/:aid',
                                title: 'Update Anime',
                                loadComponent: () => import("./web-anime/perfil/forms/update-anime/update-anime.component")
                            },
                        ]
                    },
                    {
                        path: 'info',
                        title: 'MyInfo',
                        loadComponent: () => import('./web-anime/perfil/info/info.component')
                    },
                    {
                        path: '',
                        redirectTo: 'perfil',
                        pathMatch: 'full' 
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
