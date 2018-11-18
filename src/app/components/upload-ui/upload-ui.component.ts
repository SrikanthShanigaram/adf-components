import { 
    Component,
    Input
 } from '@angular/core';
 import { MatDialog } from '@angular/material';
 import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';

@Component({
    selector: 'app-upload-ui',
    templateUrl: './upload-ui.component.html',
    styleUrls: ['./upload-ui.component.scss']
})
export class UploadUiComponent {
    @Input()
    expanded: boolean;

    constructor(public dialog: MatDialog) {}

    openUploadDialog(): void{
        const dialogRef = this.dialog.open(UploadDialogComponent, {
            width: '500px',
            data: {}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    }
}