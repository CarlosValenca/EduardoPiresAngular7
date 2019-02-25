import {IMyOptions} from "mydatepicker";

export class DateUtils {
    // Este método converte um padrão de universal time clock (hora universal) objetivando salvar a
    // data com o formato universal de data e hora, assim usuários de diversos países podem trabalhar
    // normalmente no mesmo sistema
    public static convertUTCDateToLocalDate(date): Date {

        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset);

        return newDate;
    }

    // Baseado em um objeto que será convertido para data, converteremos para um objeto que o datePicker entenda
    public static setMyDatePickerDate(myDate: any): Object {
        let pickerDate = new Date(myDate);
        return { date: { year: pickerDate.getFullYear(), month: pickerDate.getMonth() + 1, day: pickerDate.getDate()}};
    }

    // Recebe um objeto data formatado para o DatePicker e transforma em um date convencional
    public static getMyDatePickerDate(myDate: any): Date {
        return new Date(myDate.date.year, myDate.date.month - 1, myDate.date.day);
    }

    // Cria uma instância de data baseada na data local, defino o tamanho da fonte (14px), o formato de data,
    // labels para o dia da semana e meses em português (ou qualquer outro idioma), se mostro ou não o botão
    // de hoje, se marco o dia atual, defino o primeiro dia da semana, defino o ano mínimo e máximo
    // Não permite criar um evento de hoje para trás pelo disableUntil
    public static getMyDatePickerOptions(): IMyOptions {
        let v = new Date();
        
        let dateNow = this.convertUTCDateToLocalDate(new Date());

        let myDatePickerOptions: IMyOptions = {
            selectionTxtFontSize: '14px',
            dateFormat: 'dd/mm/yyyy',
            dayLabels: { su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab' },
            monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
            showTodayBtn: false,
            firstDayOfWeek: "mo",
            markCurrentDay: true,
            sunHighlight: true,
            satHighlight: true,
            showWeekNumbers: true,
            minYear: dateNow.getFullYear(),
            maxYear: dateNow.getFullYear() + 3,
            disableUntil: { year: dateNow.getFullYear(), month: dateNow.getUTCMonth() + 1, day: dateNow.getDate() - 1 },
            height: '34px',
            width: '284px'
        };
        return myDatePickerOptions;
    }
}