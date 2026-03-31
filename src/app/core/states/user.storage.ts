export class UserStorage {
    public static removeSessionStorage(): void {
        sessionStorage.clear();
    }

    public static removeLocalStorage(): void {
        localStorage.clear();
    }
}
