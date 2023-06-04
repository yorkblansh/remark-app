import { GenericFormInterface } from "./generic.interface";

export interface Form16Interface extends GenericFormInterface {
    /**
     * datamatrix object contains img base 64 string and img size: small or big
     */
    dataMatrix: { imgSize: 'small' | 'big'; imgBase64: string; };
    /**
     * dataMatrixBase64
     */
    dataMatrixBase64: string;
    /**
     * dataMatrixBase64
     */
    barcodeBase64: string;
    /**
     * Тип пересылки
     */
    readonly sendType: string;
    /**
     * Номер накладной
     */
    readonly barcode: string;
    /**
     * Дата создания накладной
     */
    readonly date: string;
    /**
     * Номер пломбы
     */
    readonly sealNumber: string;
    /**
     * Индекс отправительной почты
     */
    readonly indexFrom: string;
    /**
     * Индекс входящей почты
     */
    readonly indexTo: string;
    /**
     * packages
     */
    readonly packages: Packages[];
}

interface Packages {
    /**
     * Коды отметок внутренних и международных отправлений
     * особые отметки
     * postmark
     */
    readonly rpiMark: string;
    /**
     * Сумма объявленной ценности
     * Сумма объявленной ценности (ОЦ)
     *  должна быть записана в копейках.
     *  Значение должно записываться целым числом,
     *  при этом два младших разряда должны быть значением копеек.
     *
     * Сумма объявленной ценности (руб.)
     */
    readonly rpiValue: string;
    /**
     * Идентификатор почтового отпр. или перевода
     */
    readonly rpiBarCode: string;
    /**
     * RpiBarCode | ШИ вложение
     * Внутренний ШПИ
     * Международный ШПИ стандарта S10 ВПС
     * ШИ почтовых вещей
     * Зарезервировано для специальных ШИ
     * идентификатор почт отправления
     *
     * Наименование почтового отправления
     */
    readonly rpiName: string;
}
