import {TOrders} from "./types";

export const data: TOrders = {
    total: 1765,
    totalToday: 12,
    orders: [
        {
            number: 6543,
            name: "Тестовый бургер 1",
            status: "inProgress",
            ingredients: [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093f",
                "643d69a5c3f7b9001cfa0946",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093c"
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            number: 65439332,
            name: "Тестовый бургер 2",
            status: "done",
            ingredients: [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093c"
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            number: 654934232,
            name: "Тестовый бургер 3",
            status: "done",
            ingredients: [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa093c"
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            number: 654394232,
            name: "Тестовый бургер 4",
            status: "done",
            ingredients: [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093c"
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            number: 654393422,
            name: "Тестовый бургер 5",
            status: "inProgress",
            ingredients: [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093c"
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
}