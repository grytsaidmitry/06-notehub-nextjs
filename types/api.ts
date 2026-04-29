import { Note } from "./note";

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}
