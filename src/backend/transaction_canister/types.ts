import { nat64, Record, text } from 'azle';

export type State = {
    accounts: {
        [id: string]: Account;
    };
    notification: string;
};

export const Account = Record({
    id: text,
    balance: nat64
});
export type Account = typeof Account.tsType;

export const AccountArgs = Record({
    id: text
});
export type AccountArgs = typeof AccountArgs.tsType;
