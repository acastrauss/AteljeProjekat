export class LoginCredentials {
    static username = "";
    static passwordHash = "";
    static userId = -1;
    static userRole = -1;

    static ResetCredentials() {
        LoginCredentials.username = "";
        LoginCredentials.passwordHash = "";
        this.userId = -1;
        this.userRole = -1;
    }
}