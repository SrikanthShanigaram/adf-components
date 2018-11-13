import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadFilesEvent,ConfirmDialogComponent } from '@alfresco/adf-content-services';
import { FileModel } from '@alfresco/adf-core';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit{

    constructor(
        public dialogRef: MatDialogRef<UploadDialogComponent>,public dialog: MatDialog,
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
    onFileUploaded(event: any) {
        console.log(event,"event");
    }
    onBeforeFileUpload(event: UploadFilesEvent) {
        event.pauseUpload();
        const files = event.files || [];
        console.log("Test :: ",files)
        var fileIndex = 0
        for(; fileIndex < files.length; fileIndex++){
            var fileModel: FileModel = files[fileIndex];
            console.log(fileIndex,fileModel);
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: {
                    title: 'Upload',
                    message: `Are you sure you want to upload ${files.length} file(s)?`
                },
                minWidth: '250px'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    console.log("==",fileModel);
                    if( fileModel.options == null ){
                        fileModel.options = {}
                    }
                    if( fileModel.options.properties == null ){
                        fileModel.options.properties = {}
                    }
                    // Getting Issue becuase og no qname with bt [No content Model]        
                    fileModel.options.properties['bt:fiscalYear'] = 2018;
                    console.log(fileIndex,fileModel);
                    event.resumeUpload();
                }
            });           
        }
    }
}