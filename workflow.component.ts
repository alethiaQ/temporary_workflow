import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {Table} from './workflow';
import {WorkflowService} from './workflow.service';

@Component({
    selector: 'app-workflow-table',
    templateUrl: './workflow.component.html',
    styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
    clientList = this.tableService.getTable();
    filterClient;
    page = 1;
    pageSize = 2;
    editClient: FormGroup;
    editAddLabel: string = 'Edit';
    clientDetail: Table = null;
    totalLengthOfCollection: number;

    public searchTerm: string;
    constructor(private tableService: WorkflowService, private fb: FormBuilder, private modalService: NgbModal) {
        this.filterClient = this.clientList;
        // this.cfilterClient = this.clientList;
        // this.sortClientList = this.clientList;
        // this.totalLengthOfCollection = this.cfilterClient.length;
      }

      ngOnInit() {
        // this.editClient = this.fb.group({
        //   fullName: ['', Validators.required],
        //   UserName: ['', Validators.required],
        //   email: ['', [Validators.email, Validators.required]]
        // })
      }

      getFilteredData() {
        console.log('SEARCH INPUT = ' + this.searchTerm);
        let splitted = this.searchTerm.split(/[\s,;\t\n]+/);
        const filtered = this.tableService.getTable().filter(f => splitted.indexOf(f.assetId) !== -1);
        console.log(filtered);
        return this.filterClient = filtered;
      }
      readableTime(date) {
        return moment.unix(date).format('LLL');
      }
      refreshTableButton() {
        this.filterClient = this.tableService.getTable();
      }
      mapMPX(mpxPath) {
        return this.tableService.mapAccountsById(mpxPath);
      }

      // filter(v: string) {
      //   return this.tableService.getTable().filter(x => x.assetId.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      //     x.title.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.status.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      //     x.workflow.toLowerCase().indexOf(v.toLowerCase()) !== -1);
      // }
}
