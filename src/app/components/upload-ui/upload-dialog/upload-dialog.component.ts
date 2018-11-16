import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadFilesEvent } from '@alfresco/adf-content-services';
import { FileModel } from '@alfresco/adf-core';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit{

    constructor(
        public dialogRef: MatDialogRef<UploadDialogComponent>, public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any) {}
    fiscalYear = [];
    fiscalMonth = [];
    selectedYear;
    selectedMonth;
    selectedOrigin;
    selectedService;
    origin = [ 'Tax Advisor', 'Tax Advisor Client'];
    service = [ 'Buchhaltung', 'Jahresabschluss', 'Lohn', 'Steuerberatung', 'Sonstiges'];
    ngOnInit() {
        const date = new Date();
        this.selectedYear = date.getFullYear();
        // setting from from last five year
        const fiscalYearStart: number = this.selectedYear - 5;
        const fiscalYearLimit =  10;
        let index = 0
        for ( index = fiscalYearStart; index <= fiscalYearStart + fiscalYearLimit; index++){
            this.fiscalYear.push(index);
        }

        const fiscalMonthStart = 1 ;
        const fiscalMonthlimit = 12;
        for ( index = fiscalMonthStart; index <= fiscalMonthlimit; index++){
            this.fiscalMonth.push(index);
        }
    }
    
    onFileUploaded(event: any) {
        console.log(event, "event");
    }
    onBeforeFileUpload(event: UploadFilesEvent) {
        event.pauseUpload();
        const files = event.files || [];
        let fileIndex = 0
        for (; fileIndex < files.length; fileIndex++){
            const fileModel: FileModel = files[fileIndex];
            console.log(fileIndex, fileModel);
            // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            //     data: {
            //         title: 'Upload',
            //         message: `Are you sure you want to upload ${files.length} file(s)?`
            //     },
            //     minWidth: '250px'
            // });

            // dialogRef.afterClosed().subscribe(result => {
            //     if (result === true) {
            //         console.log("==", fileModel);                    
            //     }
            // });  
            if ( fileModel.options == null ){
                fileModel.options = {}
            }
            // Setting document type
            fileModel.options['nodeType'] = 'bt:finacialDocument';
            if ( fileModel.options.properties == null ){
                fileModel.options.properties = {}
            }
            // Setting custom model content types
            fileModel.options.properties['bt:fiscalYear'] = this.selectedYear;
            fileModel.options.properties['bt:fiscalMonth'] = this.selectedMonth;
            fileModel.options.properties['bt:origin'] = this.selectedOrigin;
            fileModel.options.properties['bt:service'] = this.selectedService;
            console.log(fileIndex, fileModel);         
        }
        this.dialogRef.close();
        event.resumeUpload();
    }
}