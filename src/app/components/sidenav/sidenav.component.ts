/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2018 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import {
  Component,
  Input,
  Output,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  EventEmitter
} from '@angular/core';
import { AppExtensionService } from '../../extensions/extension.service';
import { NavBarGroupRef } from '@alfresco/adf-extensions';
import { Store } from '@ngrx/store';
import { AppStore } from '../../store/states';
import { ruleContext } from '../../store/selectors/app.selectors';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-sidenav' }
})
export class SidenavComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject<boolean>();
  @Output() onLeftNavNodeSelected: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  showLabel: boolean;

  groups: Array<NavBarGroupRef> = [];

  constructor(
    private router: Router,
    private store: Store<AppStore>,
    private extensions: AppExtensionService,
  ) {}

  ngOnInit() {
    this.store
      .select(ruleContext)
      .pipe(
        map(rules => rules.repository),
        distinctUntilChanged(),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.groups = this.extensions.getApplicationNavigation(
          this.extensions.navbar
        );
      });
  }

  trackById(index: number, obj: { id: string }) {
    return obj.id;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  onNodeSelect(node: any): void{
    this.onLeftNavNodeSelected.emit(true);
    this.router.navigate(['/personal-files', node.entry.id], {
      replaceUrl: true
    });
  }
}