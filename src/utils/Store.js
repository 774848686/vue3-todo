export default class Store {
    /**
     * 本地存值，优先存localStorage，其次cookie
     * @param name 键
     * @param value 值
     */
    static set(name, value) {
        try {
            this.setLocal(name, value);
        } catch (e) {
            this.setCookie(name, value);
        }
    }
    /**
     * 本地取值，优先取localStorage，其次cookie
     * @param name 键
     */
    static get(name) {
        try {
            return this.getLocal(name);
        } catch (e) {
            return this.getCookie(name);
        }
    }
    /**
     * 本地删值，删除localStorage中的值或者sessionStorage中的值
     * @param name 键
     */
    static del(name) {
        try {
            this.delLocal(name);
        } catch (e) {
            this.delCookie(name);
        }
    }
    /**
     * localStorage中存值
     * @param name 键
     * @param value 值
     */
    static setLocal(name, value) {
        localStorage.setItem(name, value);
    }
    /**
     * localStorage中取值
     * @param name 键
     */
    static getLocal(name) {
        return localStorage.getItem(name);
    }
    /**
     * localStorage中删值
     * @param name 键
     */
    static delLocal(name) {
        localStorage.removeItem(name);
    }
    /**
     * 清楚localStorage中的所有内容
     */
    // static clearLocal() {}
    /**
     * sessionStorage中存值
     * @param name 键
     * @param value 值
     */
    static setSession(name, value) {
        sessionStorage.setItem(name, value);
    }
    /**
     * sessionStorage中取值
     * @param name 键
     */
    static getSession(name) {
        return sessionStorage.getItem(name);
    }
    /**
     * sessionStorage中删值
     * @param name 键
     */
    static delSession(name) {
        sessionStorage.removeItem(name);
    }
    /**
     * 清除sessionStorage中的值
     */
    // static clearSession() {}
    /**
     * 在cookie中存储一个值
     * @param name 键
     * @param value 值
     */
    static setCookie(name, value) {
        let Days = 30;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + window['escape'](value) + ";expires=" + exp.toUTCString();
    }
    /**
     * 在cookie中取一个值
     * @param name 键
     */
    static getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        arr = document.cookie.match(reg);
        if (arr) {
            return window['unescape'](arr[2]);
        } else {
            return null;
        }
    }
    /**
     * 删除cookie中的一个值
     * @param name 键
     */
    static delCookie(name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
        }
    }
}