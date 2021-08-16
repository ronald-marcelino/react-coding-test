import { User } from '../models/User';

export enum UserSearchPageState {
    DEFAULT,
    READ_USERS
};

export const initialState: UserSearchState = {
    users: []
};

export type UserSearchState = {
    users: User.Model[];
};