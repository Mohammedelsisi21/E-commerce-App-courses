import Cookies from 'universal-cookie';
const cookies = new Cookies();

class CookiesServices {
    get(name: string) {
        return cookies.get(name);
    }

    set(name: string, value: string, option?: { path?: string; expires?: Date }) {
        return cookies.set(name, value, option);
    }

    remove(name: string) {
        return cookies.remove(name, { path: '/' });
    }
}

export default new CookiesServices();
