import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Listing } from "../models/listing";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  fetchListings() {
    return this.http.get<Listing[]>("/api/listings");
  }

  fetchListing(id: string) {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

}