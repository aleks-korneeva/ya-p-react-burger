export enum OrderStatusEnum {
    CREATED = 'created',
    PENDING = 'pending',
    DONE = 'done'
}

type StatusTranslations = {
    [key in OrderStatusEnum]: string;
}

export class OrderStatus {
    private static translations: StatusTranslations = {
        [OrderStatusEnum.CREATED]: 'Создан',
        [OrderStatusEnum.PENDING]: 'Готовится',
        [OrderStatusEnum.DONE]: 'Выполнен'
    };

    static getStatusRu(status: string): string {
        const upperStatus = status as OrderStatusEnum;
        return this.translations[upperStatus] || 'Неизвестный статус';
    }
}