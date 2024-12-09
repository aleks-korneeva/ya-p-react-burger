import {BUN, MAIN, SAUCE} from "./ingredient-types";

export type TIngredientsType = typeof BUN | typeof SAUCE | typeof MAIN;

export type TIngredient = {
    _id: string,
    name: string,
    type: TIngredientsType,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile?: string,
    image_large?: string,
    __v: number
}

export type TIngredientWithKey = TIngredient & {
    key: string;
}

export type TUser = {
    name: string;
    email: string
}

export type TResponse = {
    success: boolean
}

export type TAuthResponse = TResponse & {
    user: TUser;
    accessToken: string;
    refreshToken: string
}

export type TUserWithPassword = TUser & {
    password: string;
}

export type TResponseWithMessage = TResponse & {
    message: string;
}

export type TOrder = {
    number: number;
    status: string;
    name: string;
    ingredients: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type TOrders = {
    orders: TOrder[];
    total: number;
    totalToday: number;
}