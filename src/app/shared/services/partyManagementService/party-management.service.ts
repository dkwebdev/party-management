import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PartyManagementService {
  storage = localStorage;
  constructor(private http: HttpClient) { }

  /**
   * Function is used to create.
   * @param partyDetails 
   * @returns 
   */
  createParty(partyDetails: any) {
    return this.http.post(environment.AUTH_BASE_URL + 'party/', partyDetails)
  }

  /**
   * Function is used to get all party list. 
   * @returns 
   */
  getAllPartyList() {
    return this.http.get(environment.AUTH_BASE_URL + 'party/');
  }

  /**
   * Function is used to get data by id.
   * @param partyId 
   */
  getPartyDataById(partyId: any) {
    return this.http.get(environment.AUTH_BASE_URL + 'party/?id=' + partyId);
  }

  /**
   * Function is used to update Data.
   * @param partyId 
   */
  updatePartyDataById(partyId: any, partyDetails: any) {
    return this.http.put(environment.AUTH_BASE_URL + 'party/?id=' + partyId, partyDetails);
  }

  /**
   * Fucntion is used to delete.
   * @param partyId 
   */
  deletePartyDataById(partyId: any) {
    return this.http.delete(environment.AUTH_BASE_URL + 'party/?id=' + partyId);
  }
}
