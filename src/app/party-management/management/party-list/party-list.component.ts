import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PartyManagementService } from 'src/app/shared/services/partyManagementService/party-management.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent {
  partyList: any = [];

  constructor(private partyService: PartyManagementService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPartyList();
  }

  /**
   * Function is used get all Data.
   */
  getPartyList() {
    this.partyService.getAllPartyList().subscribe((res) => {
      this.partyList = res;
    }, (error) => {
      this.toastr.error('', error.error.detail);
    })
  }

  /**
   * Function is used delete data by id.
   * @param partyId 
   */
  deletePartyDataById(partyId: any) {
    this.partyService.deletePartyDataById(partyId).subscribe((res: any) => {
      if (res.success) {
        this.getPartyList();
      }
    })
  }
}
