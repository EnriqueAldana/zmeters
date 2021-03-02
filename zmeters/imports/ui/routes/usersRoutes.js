import SaveUser from "../views/Users/SaveUser";
import ListUsers from "../views/Users/ListUsers";

export default {
    path: 'usuarios',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.users',
            path: '',
            component: ListUsers
        },
        {
            name: 'home.users.create',
            path: 'crear',
            component: SaveUser
        },
        {
            name: 'home.users.edit',
            path: 'editar',
            component: SaveUser
        }
    ]
}