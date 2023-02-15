import * as FileSaver from 'file-saver';

export class Helpers{


    constructor(){}

   /**
    * Convertir un objet en formdata
    * @param object l'objet a inserer dans le formdata
    * @returns Formdata
    */

    static toFormData(object: any): FormData {
        const formdata = new FormData();
        // console.log(object.etat);
        for (const prop in object) {
        // skip loop if the property is from prototype
            if (!object.hasOwnProperty(prop)) { continue; }
            formdata.append(prop, object[prop]);

        }
        return formdata;
    }


  static exportExcel(name: string, dataList: any[]): void {
      import('xlsx').then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(dataList);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, name);
    });
  }

  static saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
