import { Accessor, Setter } from 'solid-js';

type IdToken = {
    sub: number;
    name: string;
    picture: string;
    email: string;
};
type Identity = {
    identity: IdToken;
};
type MinAppState = {
    identity: Identity | undefined;
    error?: any;
};

declare const ID_TOKEN_COOKIE = "id_token";
declare function handleAuth<T extends MinAppState>(state: Accessor<T>, setState: Setter<T>): void;

declare function removeCookie(cname: string): void;
declare function getCookie(cname: string): string | null;
declare function setCookie(name: string, value: string, expirationDays?: number): void;

declare let AUTH_HOST: string | undefined;
type AuthConfig = {
    api: string;
    web: string;
};
declare function setAuthConfig({ api, web }: AuthConfig): void;
declare function logout(): Promise<Response>;
declare function authentifiedFetch(url: string, init?: RequestInit | undefined): Promise<Response>;

export { AUTH_HOST, type AuthConfig, ID_TOKEN_COOKIE, type IdToken, type Identity, type MinAppState, authentifiedFetch, getCookie, handleAuth, logout, removeCookie, setAuthConfig, setCookie };
