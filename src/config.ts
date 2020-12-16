interface ServicesInfo {
    AuthService: {
        API: string;
        PORT: number;
        ROUTE: string;
    };
}

export const RemoteServicesInfo: ServicesInfo = {
    AuthService: {
        API: "http://localhost",
        PORT: 5000,
        ROUTE: "/User/validate"
    }
};