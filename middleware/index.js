// from this file we will export our all middleware functions
import {authJWT} from "./authJWT.js";
import {checkDuplicateUsernameOrEmail,checkRolesExisted} from "./verifySignup.js";

export const middlewareFn = {
    authJWT:authJWT,
    verifySignup:{
        checkDuplicateUsernameOrEmail:checkDuplicateUsernameOrEmail,
        checkRolesExisted:checkRolesExisted

    }
}