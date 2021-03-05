import { Profile } from './Profile';
import ProfilesServ from "./ProfilesServ";
import {PermissionMiddleware} from "../../middlewares/PermissionMiddleware";
import Permissions from "../../startup/server/Permissions";

const profilePublication=new PublishEndpoint('profile.list', function(param1) {
         return Profile.find({name: { $nin:ProfilesServ.getStaticprofilesName()}});
    });

profilePublication.use(new PermissionMiddleware(Permissions.PROFILES.LIST.VALUE));
