import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() {
  }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = <XLSX.AOA2SheetOpts> (XLSX.utils.sheet_to_json(ws, {header: 1}));

    return data;
  }

  public exportExcel(jsonData: any[], fileName: string) {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    this.saveExcelFile(excelBuffer, fileName);
    return true;
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  public exportToFile(fileName: string, element_id: string) {
    if (!element_id) {
      throw new Error('Element Id does not exists');
    }

    let tbl = document.getElementById(element_id);
    // console.log(tbl);
    let wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, fileName + '.xlsx');
    return true;
  }

  public exportToJSON() {

  }

}
