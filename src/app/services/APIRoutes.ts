import { HttpHeaders } from "@angular/common/http";
import { ApplicationRoute } from "../models/application/ApplicationRoute";

export class APIRoutes {
    private static readonly Port: number = 8080;
    private static readonly BaseRoute: string = `http://localhost:${APIRoutes.Port}/api`;

    /**
     * @description all api endpoints useful for the currently logged in user
     */
    public static readonly User = class {
        public static readonly Authenticate: ApplicationRoute = {
            //path: `${APIRoutes.BaseRoute}/login`,
            path: "http://localhost:8080/api/login",
            requiresToken: false
        };
    };

}

export class APIHeaders {
    public static readonly AuthToken: string = 'Authorization';

    /**
     * @description generates the http headers needed for an authorized request to the api
     * @param token the api token (retrievable from the authentication service)
     */
    public static get(token: string): HttpHeaders {
        if(!token) throw new Error('API token must be provided!');

        const headerValues = { };
        (headerValues as any)[APIHeaders.AuthToken] = token;
        
        return new HttpHeaders(headerValues);
    }
}