import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit{

    constructor(
        public dialogRef: MatDialogRef<UploadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}
    fiscalYear = [];
    fiscalMonth = [];
    currentYear;
    origin= [ 'Tax Advisor', 'Tax Advisor Client'];
    service= [ 'Buchhaltung', 'Jahresabschluss', 'Lohn', 'Steuerberatung', 'Sonstiges'];
    ngOnInit() {
        var date = new Date();
        this.currentYear= date.getFullYear();
        // setting from from last five year
        var fiscalYearStart: number = this.currentYear-5;
        var fiscalYearLimit: number =  10;
        var index: number
        for(index = fiscalYearStart; index<= fiscalYearStart+ fiscalYearLimit; index++){
            this.fiscalYear.push(index);
        }

        var fiscalMonthStart= 1 ;
        var fiscalMonthlimit= 12;
        for(index= fiscalMonthStart; index<= fiscalMonthlimit; index++){
            this.fiscalMonth.push(index);
        }
        console.log(this.currentYear,"fiuscalyear")
    }
    
      onNoClick(): void {
        this.dialogRef.close();
      }
}