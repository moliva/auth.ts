import { Accessor, Setter } from 'solid-js';

declare function removeCookie(cname: string): void;
declare function getCookie(cname: string): string | null;
declare function setCookie(name: string, value: string, expirationDays?: number): void;

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

export { ID_TOKEN_COOKIE, type IdToken, type Identity, type MinAppState, getCookie, handleAuth, removeCookie, setCookie };
