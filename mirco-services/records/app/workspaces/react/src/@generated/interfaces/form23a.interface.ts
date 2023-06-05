export interface Form23AInterface {
    /**
     * dataMatrixBase64
     */
    dataMatrixBase64: string;
    /**
     * dataMatrixBase64
     */
    barcodeBase64: string;
    /**
     * В сопровождении
     */
    readonly maintainer: string;
    /**
     * Форма 81
     */
    readonly form_81: string;
    /**
     * Номер пломбы
     */
    readonly seal_number: string;
    /**
     * Номер транспортного средства
     */
    readonly vechicle_number: string;
    /**
     * Перпевозчик
     */
    readonly transporter: string;
    /**
     * Номер накладной
     */
    readonly invoice_number: string;
    /**
     * Индекс отправительной почты
     */
    readonly outcome_mail_index: string;
    /**
     * Индекс входящей почты
     */
    readonly income_mail_index: string;
    /**
     * адресс входящей почты
     */
    readonly income_mail_adress: string;
    /**
     * Индекс почтовой емкости
     */
    readonly postal_capacity_index: string;
    /**
     * Количество емкостей
     */
    readonly noc: NumberOfContainers;
    /**
     * Всего емкостей
     */
    readonly total_capacities: string;
    /**
     * Всего РПО, пересылаемых открыто
     */
    readonly total_registered_mail_sent_openly: string;
    /**
     * Количество емкостей (суммы столбцов)
     */
    readonly noc_sum: NumberOfContainers;
    /**
     * Всего емкостей (сумма)
     */
    readonly total_capacities_sum: string;
    /**
     * Всего РПО, пересылаемых открыто (сумма)
     */
    readonly total_registered_mail_sent_openly_sum: string;
}

interface NumberOfContainers {
    /**
     * С отправлением первого килограма
     */
    readonly from_first_kilogram_departure: string;
    /**
     * ЕМС
     */
    readonly ems: string;
    /**
     * Правительственные
     */
    readonly government: string;
    /**
     * Международные
     */
    readonly international: string;
    /**
     * Страховые
     */
    readonly insurance: string;
    /**
     * С заказной корреспонденции
     */
    readonly from_registered_correspondence: string;
    /**
     * С простой корреспонденции
     */
    readonly with_simple_correspondence: string;
    /**
     * Вес (кг)
     */
    readonly weight: string;
    /**
     * С печатью
     */
    readonly with_stamp: string;
    /**
     * Порожняя тара
     */
    readonly empty_containers: string;
    /**
     * Группа РПО
     */
    readonly registered_mail_group: string;
}
