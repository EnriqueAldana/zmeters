import ListProfiles from "../views/Profiles/ListProfiles";
import SaveProfile from "../views/Profiles/SaveProfile";

export default {
    path: 'perfiles',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children: [
        {
            name: 'home.profiles',
            path: '',
            component: ListProfiles
        },
        {
            name: 'home.profiles.create',
            path: 'crear',
            component: SaveProfile
        },
        {
            name: 'home.profiles.edit',
            path: 'editar',
            component: SaveProfile
        }
    ]

}